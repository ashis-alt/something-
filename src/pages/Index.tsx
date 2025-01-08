import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Building2, User } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Food Safety & Transparency Platform
          </h1>
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