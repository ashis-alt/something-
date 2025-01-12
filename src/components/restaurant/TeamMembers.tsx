import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Employee {
  name: string;
  role: string;
  photoUrl: string;
}

interface TeamMembersProps {
  employees: Employee[];
}

const TeamMembers = ({ employees }: TeamMembersProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {employees.map((employee, index) => (
          <div key={index} className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-2">
              <AvatarImage src={employee.photoUrl} alt={employee.name} />
              <AvatarFallback>{employee.name[0]}</AvatarFallback>
            </Avatar>
            <p className="font-medium">{employee.name}</p>
            <p className="text-gray-600">{employee.role}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TeamMembers;