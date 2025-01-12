import { Card } from "@/components/ui/card";
import { Search, Shield, MessageSquare } from "lucide-react";

const features = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Verify Businesses",
    description: "Check the authenticity and compliance of food businesses."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Safety First",
    description: "Access detailed safety and hygiene information."
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Voice Concerns",
    description: "Register complaints and provide feedback."
  }
];

const FeatureSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="p-6 text-center">
          <div className="flex justify-center mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </Card>
      ))}
    </div>
  );
};

export default FeatureSection;