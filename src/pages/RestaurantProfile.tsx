import { useParams } from "react-router-dom";
import HygieneRating from "@/components/HygieneRating";
import ProfileHeader from "@/components/restaurant/ProfileHeader";
import OwnerInfo from "@/components/restaurant/OwnerInfo";
import LabReports from "@/components/restaurant/LabReports";
import Certifications from "@/components/restaurant/Certifications";
import TeamMembers from "@/components/restaurant/TeamMembers";
import FacilityPhotos from "@/components/restaurant/FacilityPhotos";
import Reviews from "@/components/restaurant/Reviews";

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
  const businessData = {
    ...mockBusinessData,
    licenseNumber: licenseNumber
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <ProfileHeader businessData={businessData} />
        <HygieneRating
          scores={mockHygieneData.scores}
          violations={mockHygieneData.violations}
        />
        <OwnerInfo owner={businessData.owner} />
        <LabReports reports={businessData.labReports} />
        <Certifications certifications={businessData.certifications} />
        <TeamMembers employees={businessData.employees} />
        <FacilityPhotos photos={businessData.facilityPhotos} />
        <Reviews reviews={businessData.reviews} />
      </div>
    </div>
  );
};

export default RestaurantProfile;
