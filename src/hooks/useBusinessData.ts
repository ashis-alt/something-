import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface BusinessData {
  id: string;
  business_name: string;
  license_number: string;
  business_type: string;
  address: string;
  owner?: {
    full_name: string;
    phone_number: string;
  };
}

export const useBusinessData = (licenseNumber: string | undefined) => {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessData = async () => {
      if (!licenseNumber) {
        setIsLoading(false);
        return;
      }

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

    fetchBusinessData();
  }, [licenseNumber]);

  return { businessData, isLoading };
};