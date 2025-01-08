import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Search } from "lucide-react";

const VerifyLicense = () => {
  const [licenseNumber, setLicenseNumber] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    if (!licenseNumber) {
      toast.error("Please enter a license number");
      return;
    }
    navigate(`/business-profile/${licenseNumber}`);
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
                  className="w-full pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <Button className="w-full" onClick={handleVerify}>
              Search Business
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