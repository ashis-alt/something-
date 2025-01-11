import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Mail, Phone, MapPin, Building, Hash, Plus, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import HygieneRating from "@/components/HygieneRating";

// Mock data moved to the top - In a real app, this would come from an API
const mockBusinessData = {
  name: "Sample Restaurant",
  licenseNumber: "",  // Will be set from URL params
  gstinNumber: "22AAAAA0000A1Z5",
  address: "123 Food Street, Cuisine District, City - 123456",
  website: "https://samplerestaurant.com",
  fssaiCare: "1800-112-100",
  email: "contact@samplerestaurant.com",
  fssaiCareEmail: "care@fssai.gov.in",
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
    { type: "GST Registration", number: "22AAAAA0000A1Z5", validTill: "2025-04-01", status: "Active" },
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

const mockHygieneData = {
  scores: {
    foodHandling: 28,
    cleanliness: 23,
    staffHygiene: 18,
    legalCompliance: 14,
    customerComplaints: 9
  },
  violations: [
    {
      date: "2024-01-15",
      reason: "Temperature control violation in refrigeration unit",
      severity: "major" as const
    },
    {
      date: "2024-02-01",
      reason: "Minor cleaning schedule deviation",
      severity: "minor" as const
    }
  ]
};

const RestaurantProfile = () => {
  const { licenseNumber } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState("");
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [businessData, setBusinessData] = useState({
    ...mockBusinessData,
    licenseNumber: licenseNumber
  });

  // Create QR code content
  const qrCodeContent = JSON.stringify({
    license: businessData.licenseNumber,
    website: businessData.website
  });

  const handleEdit = (section: string) => {
    setIsEditing(prev => ({ ...prev, [section]: true }));
  };

  const handleSave = (section: string) => {
    setIsEditing(prev => ({ ...prev, [section]: false }));
    toast.success(`${section} updated successfully`);
  };

  const handleInputChange = (field: string, value: string) => {
    setBusinessData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOwnerChange = (field: string, value: string) => {
    setBusinessData(prev => ({
      ...prev,
      owner: {
        ...prev.owner,
        [field]: value
      }
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      toast.success(`${type} uploaded successfully`);
    }
  };

  const handleAddLabReport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const inputElement = e.target as HTMLInputElement;
      handleFileUpload({ target: inputElement } as React.ChangeEvent<HTMLInputElement>, 'Lab Report');
    };
    input.click();
  };

  const handleAddCertification = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const inputElement = e.target as HTMLInputElement;
      handleFileUpload({ target: inputElement } as React.ChangeEvent<HTMLInputElement>, 'Certification');
    };
    input.click();
  };

  const handleAddTeamMember = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const inputElement = e.target as HTMLInputElement;
      handleFileUpload({ target: inputElement } as React.ChangeEvent<HTMLInputElement>, 'Team Member Photo');
    };
    input.click();
  };

  const handleAddFacilityPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const inputElement = e.target as HTMLInputElement;
      handleFileUpload({ target: inputElement } as React.ChangeEvent<HTMLInputElement>, 'Facility Photo');
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Section */}
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={businessData.owner.photoUrl} alt={businessData.name} />
                  <AvatarFallback>{businessData.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {isEditing.name ? (
                      <Input
                        value={businessData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="text-3xl font-bold"
                      />
                    ) : (
                      <h1 className="text-3xl font-bold">{businessData.name}</h1>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => isEditing.name ? handleSave('name') : handleEdit('name')}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {/* License Number */}
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      {isEditing.license ? (
                        <Input
                          value={businessData.licenseNumber}
                          onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                        />
                      ) : (
                        <span>License: {businessData.licenseNumber}</span>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => isEditing.license ? handleSave('license') : handleEdit('license')}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    {/* GSTIN */}
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      {isEditing.gstin ? (
                        <Input
                          value={businessData.gstinNumber}
                          onChange={(e) => handleInputChange('gstinNumber', e.target.value)}
                        />
                      ) : (
                        <span>GSTIN: {businessData.gstinNumber}</span>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => isEditing.gstin ? handleSave('gstin') : handleEdit('gstin')}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    {/* Address */}
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {isEditing.address ? (
                        <Input
                          value={businessData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                      ) : (
                        <span>Address: {businessData.address}</span>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => isEditing.address ? handleSave('address') : handleEdit('address')}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                {/* FSSAI Care */}
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {isEditing.fssaiCare ? (
                    <Input
                      value={businessData.fssaiCare}
                      onChange={(e) => handleInputChange('fssaiCare', e.target.value)}
                    />
                  ) : (
                    <span>FSSAI Care: {businessData.fssaiCare}</span>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => isEditing.fssaiCare ? handleSave('fssaiCare') : handleEdit('fssaiCare')}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                {/* FSSAI Care Email */}
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {isEditing.fssaiCareEmail ? (
                    <Input
                      value={businessData.fssaiCareEmail}
                      onChange={(e) => handleInputChange('fssaiCareEmail', e.target.value)}
                    />
                  ) : (
                    <span>FSSAI Care Email: {businessData.fssaiCareEmail}</span>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => isEditing.fssaiCareEmail ? handleSave('fssaiCareEmail') : handleEdit('fssaiCareEmail')}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                {/* Business Email */}
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {isEditing.email ? (
                    <Input
                      value={businessData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <span>Email: {businessData.email}</span>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => isEditing.email ? handleSave('email') : handleEdit('email')}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => toast.info("Profile update functionality coming soon")}>
                  <Edit className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
                <Button variant="outline" onClick={() => toast.info("License renewal functionality coming soon")}>
                  Apply for License Renewal
                </Button>
                <Button variant="outline" onClick={() => toast.info("New license functionality coming soon")}>
                  Apply for New License
                </Button>
                <Button variant="outline" onClick={() => toast.info("Lab reports functionality coming soon")}>
                  Apply for Lab Reports
                </Button>
              </div>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <QRCodeSVG
                value={qrCodeContent}
                size={128}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>
          <HygieneRating
            scores={mockHygieneData.scores}
            violations={mockHygieneData.violations}
          />
        </Card>

        {/* Owner Information */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Owner Information</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleEdit('owner')}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Owner Info
              </Button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="owner-photo"
                onChange={(e) => handleFileUpload(e as React.ChangeEvent<HTMLInputElement>, 'Owner Photo')}
              />
              <Button variant="outline" onClick={() => document.getElementById('owner-photo')?.click()}>
                Update Photo
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={businessData.owner.photoUrl} alt={businessData.owner.name} />
              <AvatarFallback>{businessData.owner.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              {isEditing.owner ? (
                <Input
                  value={businessData.owner.name}
                  onChange={(e) => handleOwnerChange('name', e.target.value)}
                  className="text-xl font-medium"
                />
              ) : (
                <p className="text-xl font-medium">{businessData.owner.name}</p>
              )}
              <p className="text-gray-600">Owner</p>
            </div>
          </div>
        </Card>

        {/* Lab Reports */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Lab Reports</h2>
            <Button variant="outline" onClick={handleAddLabReport}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Report
            </Button>
          </div>
          <div className="grid gap-4">
            {businessData.labReports.map((report, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{report.type}</p>
                  <p className="text-sm text-gray-600">Date: {report.date}</p>
                  <p className="text-sm text-gray-600">Valid Till: {report.validTill}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    {report.status}
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => toast.info(`Remove report ${index + 1}`)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Restaurant Certifications */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Restaurant Certifications</h2>
            <Button variant="outline" onClick={handleAddCertification}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Certification
            </Button>
          </div>
          <div className="grid gap-4">
            {businessData.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{cert.type}</p>
                  <p className="text-sm text-gray-600">Number: {cert.number}</p>
                  <p className="text-sm text-gray-600">Valid Till: {cert.validTill}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    {cert.status}
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => toast.info(`Remove certification ${index + 1}`)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Employees */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Our Team</h2>
            <Button variant="outline" onClick={handleAddTeamMember}>
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessData.employees.map((employee, index) => (
              <div key={index} className="text-center relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0"
                  onClick={() => toast.info(`Remove team member ${index + 1}`)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Avatar className="h-24 w-24 mx-auto mb-2">
                  <AvatarImage src={employee.photoUrl} alt={employee.name} />
                  <AvatarFallback>{employee.name[0]}</AvatarFallback>
                </Avatar>
                {isEditing[`employee${index}`] ? (
                  <Input
                    value={employee.name}
                    onChange={(e) => handleInputChange(`employees.${index}.name`, e.target.value)}
                    className="text-center"
                  />
                ) : (
                  <p className="font-medium">{employee.name}</p>
                )}
                {isEditing[`employeeRole${index}`] ? (
                  <Input
                    value={employee.role}
                    onChange={(e) => handleInputChange(`employees.${index}.role`, e.target.value)}
                    className="text-center text-gray-600"
                  />
                ) : (
                  <p className="text-gray-600">{employee.role}</p>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => isEditing[`employee${index}`] ? handleSave(`employee${index}`) : handleEdit(`employee${index}`)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Facility Photos */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Facility Photos</h2>
            <Button variant="outline" onClick={handleAddFacilityPhoto}>
              <Plus className="mr-2 h-4 w-4" />
              Add Photo
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {businessData.facilityPhotos.map((photo, index) => (
              <div key={index} className="space-y-2 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => toast.info(`Remove facility photo ${index + 1}`)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <img
                  src={photo.url}
                  alt={photo.area}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {isEditing[`photo${index}`] ? (
                  <Input
                    value={photo.area}
                    onChange={(e) => handleInputChange(`facilityPhotos.${index}.area`, e.target.value)}
                    className="text-center"
                  />
                ) : (
                  <p className="text-center font-medium">{photo.area}</p>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => isEditing[`photo${index}`] ? handleSave(`photo${index}`) : handleEdit(`photo${index}`)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Area Name
                </Button>
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
              <Button onClick={() => {
                toast.success("Review submitted successfully!");
                setReview("");
              }}>
                Submit Review
              </Button>
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

export default RestaurantProfile;
