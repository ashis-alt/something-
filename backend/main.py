from typing import List
from fastapi import FastAPI, HTTPException, UploadFile, File, Depends
from fastapi.middleware.cors import CORSMiddleware
from models import Business, Complaint, Review, FileUpload
from database import get_business, add_business, add_complaint, get_complaints, update_business
from utils import generate_unique_filename
from auth import require_auth, ClerkUser
from config import settings
import os
from dotenv import load_dotenv
from pydantic import ValidationError
from bson import ObjectId
load_dotenv()


app = FastAPI()

# CORS middleware setup (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CLERK_FRONTEND_URL],  # Allows requests from frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/businesses/{license_number}", response_model=Business)
async def read_business(license_number: str, user: ClerkUser = Depends(require_auth)):
    business = await get_business(license_number)
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")
    return business

@app.post("/businesses/register", response_model=Business)
async def register_business(business: Business, user: ClerkUser = Depends(require_auth)):
   await add_business(business)
   return business

@app.put("/businesses/{license_number}", response_model=Business)
async def update_business_data(license_number:str, business: Business, user: ClerkUser = Depends(require_auth)):
  existing_business = await get_business(license_number)

  if not existing_business:
      raise HTTPException(status_code=404, detail="Business not found")

  await update_business(license_number, business)
  updated_business = await get_business(license_number)

  return updated_business

@app.post("/complaints", status_code=201)
async def register_complaint(complaint: Complaint, user: ClerkUser = Depends(require_auth)):
    await add_complaint(complaint)
    return {"message": "Complaint registered successfully"}

@app.get("/complaints", response_model=List[Complaint])
async def read_complaints(user: ClerkUser = Depends(require_auth)):
   complaints = await get_complaints()
   return complaints

@app.post("/businesses/{license_number}/reviews", status_code=201)
async def submit_review(license_number:str, review:Review, user: ClerkUser = Depends(require_auth)):
    business = await get_business(license_number)
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")

    business.reviews.append(review)
    await update_business(license_number, business)

    return {"message": "Review submitted"}


#Basic File Upload handling with local storage
@app.post("/businesses/{license_number}/upload")
async def upload_file(license_number: str, file: UploadFile = File(...), file_type: str = "labreport", user: ClerkUser = Depends(require_auth)):

    file_extension = os.path.splitext(file.filename)[1]
    if file_type == "labreport" and file_extension not in ['.pdf','.doc','.docx'] :
        raise HTTPException(status_code=400, detail="Invalid file type for Lab Report, please upload pdf, doc, docx files")
    elif file_type == "certificate" and file_extension not in ['.pdf','.doc','.docx']:
        raise HTTPException(status_code=400, detail="Invalid file type for Certificates, please upload pdf, doc, docx files")
    elif file_type == "image" and file_extension not in ['.jpg', '.jpeg','.png','.svg']:
        raise HTTPException(status_code=400, detail="Invalid file type for images, please upload .jpg, .jpeg, .png or .svg files")
        
    file_content = await file.read()
    
    #generate unique name
    filename = generate_unique_filename(file.filename)

    #specify the file path where you want to store the files
    upload_dir = os.path.join("uploads", license_number)
    os.makedirs(upload_dir, exist_ok=True)  # Create directory if it doesn't exist
    
    file_path = os.path.join(upload_dir, filename)
   
    #save file to path
    with open(file_path, "wb") as f:
       f.write(file_content)
    
    return {"message": f"{file_type} uploaded", "file_path": file_path}
