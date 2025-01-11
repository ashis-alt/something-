import { Card } from "@/components/ui/card";
import { Star, AlertTriangle } from "lucide-react";

interface ViolationType {
  date: string;
  reason: string;
  severity: "critical" | "major" | "minor";
}

interface HygieneScoreType {
  foodHandling: number;
  cleanliness: number;
  staffHygiene: number;
  legalCompliance: number;
  customerComplaints: number;
}

interface HygieneRatingProps {
  scores: HygieneScoreType;
  violations: ViolationType[];
}

const calculateTotalScore = (scores: HygieneScoreType): number => {
  return scores.foodHandling + 
         scores.cleanliness + 
         scores.staffHygiene + 
         scores.legalCompliance + 
         scores.customerComplaints;
};

const getStarRating = (totalScore: number): number => {
  if (totalScore >= 90) return 5;
  if (totalScore >= 75) return 4;
  if (totalScore >= 60) return 3;
  if (totalScore >= 40) return 2;
  return 1;
};

const getRatingText = (stars: number): string => {
  switch (stars) {
    case 5: return "Excellent hygiene, no violations";
    case 4: return "Good hygiene, minor issues";
    case 3: return "Satisfactory hygiene, needs improvement";
    case 2: return "Substandard hygiene, significant violations";
    default: return "Poor hygiene, critical risks";
  }
};

const HygieneRating = ({ scores, violations }: HygieneRatingProps) => {
  const totalScore = calculateTotalScore(scores);
  const stars = getStarRating(totalScore);

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Hygiene Rating</h2>
      
      <div className="flex items-center gap-2">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-6 h-6 ${
              index < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-lg font-medium">{getRatingText(stars)}</span>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Scoring Breakdown (Total: {totalScore}/100)</h3>
        <div className="grid gap-2">
          <div className="flex justify-between">
            <span>Food Handling Practices</span>
            <span>{scores.foodHandling}/30</span>
          </div>
          <div className="flex justify-between">
            <span>Cleanliness of Premises</span>
            <span>{scores.cleanliness}/25</span>
          </div>
          <div className="flex justify-between">
            <span>Staff Hygiene</span>
            <span>{scores.staffHygiene}/20</span>
          </div>
          <div className="flex justify-between">
            <span>Legal Compliance</span>
            <span>{scores.legalCompliance}/15</span>
          </div>
          <div className="flex justify-between">
            <span>Customer Complaints/History</span>
            <span>{scores.customerComplaints}/10</span>
          </div>
        </div>
      </div>

      {violations.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Violations
          </h3>
          <div className="space-y-2">
            {violations.map((violation, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  violation.severity === "critical"
                    ? "bg-red-100"
                    : violation.severity === "major"
                    ? "bg-orange-100"
                    : "bg-yellow-100"
                }`}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{violation.date}</span>
                  <span
                    className={`capitalize ${
                      violation.severity === "critical"
                        ? "text-red-700"
                        : violation.severity === "major"
                        ? "text-orange-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {violation.severity}
                  </span>
                </div>
                <p className="mt-1">{violation.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default HygieneRating;