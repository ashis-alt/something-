import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ConsumerLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = () => {
    if (phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    setShowVerification(true);
    toast.success("Verification code sent!");
  };

  const handleVerify = () => {
    if (verificationCode.length !== 6) {
      toast.error("Please enter a valid 6-digit verification code");
      return;
    }
    navigate("/verify-license");
    toast.success("Successfully logged in!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 animate-fadeIn">
        <h2 className="text-2xl font-semibold text-center mb-6">Consumer Login</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <Input
              type="tel"
              placeholder="Enter your 10-digit phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
              className="w-full"
            />
          </div>

          {!showVerification && (
            <Button className="w-full" onClick={handleSendCode}>
              Send Verification Code
            </Button>
          )}

          {showVerification && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Code
                </label>
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="w-full"
                />
              </div>
              <Button className="w-full" onClick={handleVerify}>
                Verify & Continue
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ConsumerLogin;