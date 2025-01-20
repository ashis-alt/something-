import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Building, Hash } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface ProfileHeaderProps {
  businessData: {
    id: string;
    business_name: string;
    license_number: string;
    business_type: string;
    address: string;
    owner?: {
      full_name: string;
      phone_number: string;
    };
  };
}

const ProfileHeader = ({ businessData }: ProfileHeaderProps) => {
  const qrCodeContent = JSON.stringify({
    license: businessData.license_number,
    name: businessData.business_name
  });

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg" alt={businessData.business_name} />
              <AvatarFallback>{businessData.business_name[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{businessData.business_name}</h1>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  <span>License: {businessData.license_number}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>Type: {businessData.business_type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Address: {businessData.address}</span>
                </div>
              </div>
            </div>
          </div>
          
          {businessData.owner && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Contact: {businessData.owner.phone_number}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Owner: {businessData.owner.full_name}</span>
              </div>
            </div>
          )}
        </div>
        <div className="bg-white p-2 rounded-lg shadow-sm">
          <QRCodeSVG
            value={qrCodeContent}
            size={128}
            level="H"
            includeMargin={true}
          />
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeader;