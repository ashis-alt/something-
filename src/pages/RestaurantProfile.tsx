import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import HygieneRating from "@/components/HygieneRating";
import ProfileHeader from "@/components/restaurant/ProfileHeader";
import OwnerInfo from "@/components/restaurant/OwnerInfo";
import LabReports from "@/components/restaurant/LabReports";
import Certifications from "@/components/restaurant/Certifications";
import TeamMembers from "@/components/restaurant/TeamMembers";
import FacilityPhotos from "@/components/restaurant/FacilityPhotos";
import Reviews from "@/components/restaurant/Reviews";

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
  const [businessData, setBusinessData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const { data: business, error } = await supabase
          .from('businesses')
          .select(`
            *,
            owner:profiles(
              full_name,
              phone_number
            )
          `)
          .eq('license_number', licenseNumber)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (!business) {
          toast.error("Business not found");
          return;
        }

        setBusinessData(business);
      } catch (error) {
        console.error('Error fetching business data:', error);
        toast.error("Failed to load business data");
      } finally {
        setIsLoading(false);
      }
    };

    if (licenseNumber) {
      fetchBusinessData();
    }
  }, [licenseNumber]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading business information...</p>
        </div>
      </div>
    );
  }

  if (!businessData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Business not found</p>
        </div>
      </div>
    );
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