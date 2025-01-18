import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const WelcomeSection = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Food Safety Portal</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Ensuring food safety and quality through transparent business verification
        and consumer feedback.
      </p>
      <div className="flex gap-4 justify-center">
        <Button onClick={() => navigate("/business-login")}>
          Business Login
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate("/consumer-login")}
        >
          Consumer Login
        </Button>
      </div>
    </div>
  );
};

export default WelcomeSection;