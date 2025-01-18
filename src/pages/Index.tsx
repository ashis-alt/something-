import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Building2, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Index = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        toast.success("Successfully signed in!");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSendOTP = async () => {
    try {
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });
      
      if (error) {
        if (error.message.includes('phone_provider_disabled')) {
          toast.error("Phone authentication is not enabled. Please enable it in Supabase dashboard.");
        } else {
          toast.error(error.message);
        }
      } else {
        setShowOTP(true);
        toast.success("OTP sent successfully!");
        // For development: If test OTP is enabled, show the OTP from the response
        if (data?.user?.confirmation_sent_at) {
          console.log("Test OTP Response:", data);
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: 'sms',
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Successfully verified!");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to verify OTP");
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Welcome to FSSAI Portal
          </h1>
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number with country code (e.g. +91)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {!showOTP && (
                <Button 
                  className="w-full" 
                  onClick={handleSendOTP}
                  disabled={!phoneNumber}
                >
                  Send OTP
                </Button>
              )}
            </div>

            {showOTP && (
              <div className="space-y-2">
                <Label>Enter OTP</Label>
                <InputOTP
                  value={otp}
                  onChange={setOtp}
                  maxLength={6}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, idx) => (
                        <InputOTPSlot key={idx} {...slot} index={idx} />
                      ))}
                    </InputOTPGroup>
                  )}
                />
                <Button 
                  className="w-full" 
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 6}
                >
                  Verify OTP
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Food Safety & Transparency Platform
          </h1>
          <Button 
            variant="outline" 
            onClick={() => {
              supabase.auth.signOut();
              toast.success("Signed out successfully");
            }}
          >
            Sign Out
          </Button>
        </div>

        <div className="text-center mb-12 animate-fadeIn">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with verified food businesses and make informed decisions about
            where you eat
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer animate-fadeIn" onClick={() => navigate("/consumer-login")}>
            <div className="text-center">
              <User className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-semibold mb-4">For Consumers</h2>
              <p className="text-gray-600 mb-4">
                Verify and review food establishments, access safety reports, and make informed choices
              </p>
              <Button className="w-full">
                Continue as Consumer
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer animate-fadeIn" onClick={() => navigate("/business-login")}>
            <div className="text-center">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-semibold mb-4">For Businesses</h2>
              <p className="text-gray-600 mb-4">
                Showcase your commitment to food safety and build trust with your customers
              </p>
              <Button className="w-full">
                Continue as Business
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;