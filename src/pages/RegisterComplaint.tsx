import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const RegisterComplaint = () => {
  const { licenseNumber } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState({
    subject: "",
    description: "",
    contactNumber: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!complaint.subject.trim() || !complaint.description.trim() || !complaint.contactNumber.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    // In a real app, this would be an API call
    toast.success("Complaint registered successfully!");
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Register Complaint</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Subject</label>
              <Input
                value={complaint.subject}
                onChange={(e) => setComplaint(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Enter complaint subject"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Description</label>
              <Textarea
                value={complaint.description}
                onChange={(e) => setComplaint(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your complaint in detail"
                className="min-h-[150px]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Contact Number</label>
              <Input
                type="tel"
                value={complaint.contactNumber}
                onChange={(e) => setComplaint(prev => ({ ...prev, contactNumber: e.target.value }))}
                placeholder="Enter your contact number"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit">Submit Complaint</Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterComplaint;