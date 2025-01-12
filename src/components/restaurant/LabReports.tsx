import { Card } from "@/components/ui/card";

interface LabReport {
  type: string;
  date: string;
  validTill: string;
  status: string;
}

interface LabReportsProps {
  reports: LabReport[];
}

const LabReports = ({ reports }: LabReportsProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Lab Reports</h2>
      <div className="grid gap-4">
        {reports.map((report, index) => (
          <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{report.type}</p>
              <p className="text-sm text-gray-600">Date: {report.date}</p>
              <p className="text-sm text-gray-600">Valid Till: {report.validTill}</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
              {report.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LabReports;