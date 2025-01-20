import { useParams } from "react-router-dom";
import HygieneRating from "@/components/HygieneRating";
import ProfileHeader from "@/components/restaurant/ProfileHeader";
import OwnerInfo from "@/components/restaurant/OwnerInfo";
import LabReports from "@/components/restaurant/LabReports";
import Certifications from "@/components/restaurant/Certifications";
import TeamMembers from "@/components/restaurant/TeamMembers";
import FacilityPhotos from "@/components/restaurant/FacilityPhotos";
import Reviews from "@/components/restaurant/Reviews";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import { useBusinessData } from "@/hooks/useBusinessData";

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
  const { businessData, isLoading } = useBusinessData(licenseNumber);

  if (isLoading) {
    return <LoadingSpinner message="Loading business information..." />;
  }

  if (!businessData) {
    return <ErrorDisplay message="Business not found" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <ProfileHeader businessData={businessData} />
        <HygieneRating
          scores={mockHygieneData.scores}
          violations={mockHygieneData.violations}
        />
        <OwnerInfo owner={{
          name: businessData.owner?.full_name || 'N/A',
          photoUrl: '/placeholder.svg'
        }} />
        <LabReports reports={[]} />
        <Certifications certifications={[]} />
        <TeamMembers employees={[]} />
        <FacilityPhotos photos={[]} />
        <Reviews reviews={[]} />
      </div>
    </div>
  );
};

export default RestaurantProfile;