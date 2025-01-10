import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";

const BusinessProfile = () => {
  const { licenseNumber } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState("");

  // Mock data - In a real app, this would come from an API
  const businessData = {
    name: "Sample Restaurant",
    licenseNumber: licenseNumber,
    gstinNumber: "22AAAAA0000A1Z5",
    address: "123 Food Street, Cuisine District, City - 123456",
    website: "https://samplerestaurant.com",
    owner: {
      name: "John Doe",
      photoUrl: "/placeholder.svg"
    },
    labReports: [
      { type: "Water Quality", date: "2024-02-01", validTill: "2024-08-01", status: "Passed" },
      { type: "Pest Control", date: "2024-01-15", validTill: "2024-07-15", status: "Passed" },
      { type: "Food Safety", date: "2024-01-30", validTill: "2024-07-30", status: "Passed" },
      { type: "Laboratory", date: "2024-02-10", validTill: "2024-08-10", status: "Passed" },
      { type: "FSMS", date: "2024-02-05", validTill: "2024-08-05", status: "Passed" },
      { type: "Kitchen Layout", date: "2024-01-20", validTill: "2024-07-20", status: "Passed" },
      { type: "Health and Hygiene", date: "2024-02-15", validTill: "2024-08-15", status: "Passed" },
      { type: "Waste Management", date: "2024-02-20", validTill: "2024-08-20", status: "Passed" }
    ],
    certifications: [
      { type: "FSSAI License", number: "12345678901234", validTill: "2025-03-01", status: "Active" },
      { type: "Trade License", number: "TL987654321", validTill: "2025-02-01", status: "Active" },
      { type: "GST Registration", number: businessData?.gstinNumber, validTill: "2025-04-01", status: "Active" },
      { type: "Fire Safety Certificate", number: "FSC123456", validTill: "2025-01-01", status: "Active" },
      { type: "Liquor License", number: "LL789012", validTill: "2024-12-31", status: "Active" },
      { type: "Music License", number: "ML456789", validTill: "2024-12-31", status: "Active" }
    ],
    employees: [
      { name: "Alice Smith", role: "Head Chef", photoUrl: "/placeholder.svg" },
      { name: "Bob Johnson", role: "Sous Chef", photoUrl: "/placeholder.svg" },
      { name: "Carol White", role: "Server", photoUrl: "/placeholder.svg" }
    ],
    facilityPhotos: [
      { area: "Kitchen", url: "/placeholder.svg" },
      { area: "Dining Area", url: "/placeholder.svg" },
      { area: "Storage", url: "/placeholder.svg" }
    ],
    reviews: [
      { user: "User1", text: "Great experience!", date: "2024-02-01" },
      { user: "User2", text: "Excellent service", date: "2024-01-28" }
    ]
  };

  const handleComplaint = () => {
    navigate(`/register-complaint/${licenseNumber}`);
  };

  const handleReviewSubmit = () => {
    if (!review.trim()) {
      toast.error("Please write a review before submitting");
      return;
    }
    toast.success("Review submitted successfully!");
    setReview("");
  };

  // Create QR code content
  const qrCodeContent = JSON.stringify({
    license: businessData.licenseNumber,
    website: businessData.website
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Basic Information */}
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-4">{businessData.name}</h1>
              <p className="text-gray-600">License: {businessData.licenseNumber}</p>
              <p className="text-gray-600">GSTIN: {businessData.gstinNumber}</p>
              <p className="text-gray-600">Address: {businessData.address}</p>
            </div>
            <div className="flex items-start gap-6">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <QRCodeSVG
                  value={qrCodeContent}
                  size={128}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <Button onClick={handleComplaint} variant="destructive">
                <MessageSquare className="mr-2" />
                Register Complaint
              </Button>
            </div>
          </div>
        </Card>

        {/* Owner Information */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Owner Information</h2>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={businessData.owner.photoUrl} alt={businessData.owner.name} />
              <AvatarFallback>{businessData.owner.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl font-medium">{businessData.owner.name}</p>
              <p className="text-gray-600">Owner</p>
            </div>
          </div>
        </Card>

        {/* Lab Reports */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Lab Reports</h2>
          <div className="grid gap-4">
            {businessData.labReports.map((report, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{report.type}</p>
                  <p className="text-sm text-gray-600">Date: {report.date}</p>
                  <p className="text-sm text-gray-600">Valid Till: {report.validTill}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  {report.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Restaurant Certifications */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Restaurant Certifications</h2>
          <div className="grid gap-4">
            {businessData.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{cert.type}</p>
                  <p className="text-sm text-gray-600">Number: {cert.number}</p>
                  <p className="text-sm text-gray-600">Valid Till: {cert.validTill}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  {cert.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Employees */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessData.employees.map((employee, index) => (
              <div key={index} className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-2">
                  <AvatarImage src={employee.photoUrl} alt={employee.name} />
                  <AvatarFallback>{employee.name[0]}</AvatarFallback>
                </Avatar>
                <p className="font-medium">{employee.name}</p>
                <p className="text-gray-600">{employee.role}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Facility Photos */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Facility Photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {businessData.facilityPhotos.map((photo, index) => (
              <div key={index} className="space-y-2">
                <img
                  src={photo.url}
                  alt={photo.area}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-center font-medium">{photo.area}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Reviews Section */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full"
              />
              <Button onClick={handleReviewSubmit}>Submit Review</Button>
            </div>
            <div className="space-y-4 mt-6">
              {businessData.reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">{review.user}</p>
                  <p className="text-gray-600">{review.text}</p>
                  <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BusinessProfile;
