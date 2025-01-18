import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const ComplaintForm = () => {
  const [businessLicense, setBusinessLicense] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessLicense || !description) {
      toast.error("Please fill in all fields");
      return;
    }
    // Mock submission - in real app would call API
    toast.success("Complaint registered successfully");
    setBusinessLicense("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Business License</label>
        <Input
          type="text"
          value={businessLicense}
          onChange={(e) => setBusinessLicense(e.target.value)}
          placeholder="Enter business license number"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your complaint"
          rows={4}
        />
      </div>
      <Button type="submit" className="w-full">
        Submit Complaint
      </Button>
    </form>
  );
};

export default ComplaintForm;