import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface OwnerInfoProps {
  owner: {
    name: string;
    photoUrl: string;
  };
}

const OwnerInfo = ({ owner }: OwnerInfoProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Owner Information</h2>
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={owner.photoUrl} alt={owner.name} />
          <AvatarFallback>{owner.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xl font-medium">{owner.name}</p>
          <p className="text-gray-600">Owner</p>
        </div>
      </div>
    </Card>
  );
};

export default OwnerInfo;