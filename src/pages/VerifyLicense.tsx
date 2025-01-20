import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Search, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const VerifyLicense = () => {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!licenseNumber) {
      toast.error("Please enter a license number");
      return;
    }

    setIsLoading(true);
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
        toast.error("No business found with this license number");
        return;
      }

      navigate(`/restaurant-profile/${licenseNumber}`);
    } catch (error) {
      console.error('Error verifying license:', error);
      toast.error("Failed to verify license. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-6 animate-fadeIn">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Verify Food Business License
          </h2>
          
          <div className="max-w-md mx-auto space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                License Number
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter business license number"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pr-10"
                  disabled={isLoading}
                />
                {isLoading ? (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin" />
                ) : (
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                )}
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={handleVerify}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Search Business'
              )}
            </Button>

            <p className="text-sm text-gray-600 text-center mt-4">
              Enter the license number of any food business to view their safety records,
              certifications, and customer reviews
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VerifyLicense;