import { Card } from "@/components/ui/card";

interface Review {
  user: string;
  text: string;
  date: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      <div className="space-y-4">
        <div className="space-y-4 mt-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">{review.user}</p>
              <p className="text-gray-600">{review.text}</p>
              <p className="text-sm text-gray-500 mt-2">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Reviews;