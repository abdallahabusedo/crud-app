import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import React from "react";
import AddEditEmpModal from "./AddEditEmpModal";
import { Button } from "./ui/button";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { Option } from "./ui/multiple-selector";

export interface Employee {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  skills: Option[] | undefined;
  title: string;
}
const EmpList = () => {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedEmp, setSelectedEmp] = React.useState<Employee | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const handleDeleteModalOpen = (emp: Employee | null) => {
    setSelectedEmp(emp);
    setIsDeleteModalOpen(true);
  };
  const handelModalOpen = (emp: Employee | null) => {
    setSelectedEmp(emp);
    setIsModalOpen(true);
  };

  const refreshData = () => {
    axios("http://localhost:8000/employees")
      .then((response) => response.data)
      .then((data) => setEmployees(data));
  };

  React.useEffect(() => {
    refreshData();
  }, []);
  return (
    <div className="w-full h-full space-y-4">
      <h1 className="text-4xl text-center">
        Abdallah Zaher - CRUD TEST - FullStack
      </h1>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Employee List</h1>
        <Button
          onClick={() => handelModalOpen(null)}
          className="bg-green-500 hover:bg-green-400"
        >
          Add Employee
        </Button>
      </div>
      {employees.length ? (
        <Table className="w-full border">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell className="font-medium">{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.title}</TableCell>
                <TableCell>{emp.age}</TableCell>
                <TableCell>{emp.phone}</TableCell>

                <TableCell className="">
                  <div className="flex gap-2 flex-wrap">
                    {emp.skills
                      ? emp.skills?.map((skill: Option) => (
                          <span
                            key={skill.value}
                            className="bg-gray-200 text-gray-800 p-1 rounded-md"
                          >
                            {skill.label}
                          </span>
                        ))
                      : "-"}
                  </div>
                </TableCell>
                <TableCell className="flex gap-2  w-full justify-end">
                  <Button
                    onClick={() => handelModalOpen(emp)}
                    className="bg-blue-500 hover:bg-blue-400"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteModalOpen(emp)}
                    className="bg-red-500 hover:bg-red-400"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <h1 className="text-4xl text-center">No Data</h1>
      )}

      <AddEditEmpModal
        refreshData={refreshData}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        emp={selectedEmp}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        emp={selectedEmp}
        refreshData={refreshData}
      />
    </div>
  );
};

export default EmpList;
