import { Card } from "@/components/ui/card";

interface Certification {
  type: string;
  number: string;
  validTill: string;
  status: string;
}

interface CertificationsProps {
  certifications: Certification[];
}

const Certifications = ({ certifications }: CertificationsProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Restaurant Certifications</h2>
      <div className="grid gap-4">
        {certifications.map((cert, index) => (
          <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{cert.type}</p>
              <p className="text-sm text-gray-600">Number: {cert.number}</p>
              <p className="text-sm text-gray-600">Valid Till: {cert.validTill}</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
              {cert.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Certifications;