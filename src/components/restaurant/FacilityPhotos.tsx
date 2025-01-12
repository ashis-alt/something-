import { Card } from "@/components/ui/card";

interface FacilityPhoto {
  area: string;
  url: string;
}

interface FacilityPhotosProps {
  photos: FacilityPhoto[];
}

const FacilityPhotos = ({ photos }: FacilityPhotosProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Facility Photos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="space-y-2">
            <img
              src={photo.url}
              alt={photo.area}
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="text-center font-medium">{photo.area}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FacilityPhotos;