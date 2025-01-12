import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Building, Hash } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface ProfileHeaderProps {
  businessData: {
    name: string;
    licenseNumber: string;
    gstinNumber: string;
    address: string;
    website: string;
    fssaiCare: string;
    email: string;
    fssaiCareEmail: string;
    owner: {
      name: string;
      photoUrl: string;
    };
  };
}

const ProfileHeader = ({ businessData }: ProfileHeaderProps) => {
  const qrCodeContent = JSON.stringify({
    license: businessData.licenseNumber,
    website: businessData.website
  });

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={businessData.owner.photoUrl} alt={businessData.name} />
              <AvatarFallback>{businessData.name[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{businessData.name}</h1>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  <span>License: {businessData.licenseNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>GSTIN: {businessData.gstinNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Address: {businessData.address}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>FSSAI Care: {businessData.fssaiCare}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>FSSAI Care Email: {businessData.fssaiCareEmail}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Email: {businessData.email}</span>
            </div>
          </div>
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