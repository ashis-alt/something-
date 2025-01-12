import ComplaintForm from "@/components/complaint/ComplaintForm";
import { Card } from "@/components/ui/card";

const RegisterComplaint = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-6 animate-fadeIn">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Register a Complaint
          </h1>
          <div className="flex justify-center">
            <ComplaintForm />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterComplaint;