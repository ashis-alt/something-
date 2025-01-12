import WelcomeSection from "@/components/home/WelcomeSection";
import FeatureSection from "@/components/home/FeatureSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="container mx-auto max-w-4xl space-y-12 py-12">
        <WelcomeSection />
        <FeatureSection />
      </div>
    </div>
  );
};

export default Index;