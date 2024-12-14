import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Employee } from "./EmpList";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

const OPTIONS: Option[] = [
  { label: "nextjs", value: "nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Ember", value: "ember" },
  { label: "Gatsby", value: "gatsby" },
  { label: "Astro", value: "astro" },
];

interface AddEditEmpModalProps {
  isOpen: boolean;
  onClose: () => void;
  emp: Employee | null;
  refreshData: () => void;
}

const AddEditEmpModal = ({
  isOpen,
  onClose,
  emp,
  refreshData,
}: AddEditEmpModalProps) => {
  console.log(emp);

  const form = useForm({
    defaultValues: {
      id: "",
      name: "",
      email: "",
      title: "",
      age: 0,
      phone: "",
      skills: [] as Option[] | undefined,
    },
    mode: "onChange",
  });

  function getUID() {
    return Date.now().toString(36);
  }
  useEffect(() => {
    if (emp) {
      form.reset({
        ...emp,
        skills: emp.skills?.map((skill) => ({
          label: skill.label,
          value: skill.value,
        })),
      });
    }
  }, [emp, form]);

  const onSubmit = (data: Employee) => {
    if (emp) {
      // Edit Employee
      axios.put(`http://localhost:8000/employees/${emp.id}`, data).then(() => {
        refreshData();
        form.reset();
        onClose();
      });
    } else {
      // Add Employee
      axios
        .post("http://localhost:8000/employees", {
          ...data,
          id: getUID(),
        })
        .then(() => {
          refreshData();
          form.reset();
          onClose();
        });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {emp ? `Edit Employee - ${emp.name}` : "Add Employee"}
          </DialogTitle>

          <DialogDescription>
            {emp ? "Edit the employee details" : "Add new employee details"}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-8">
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-black">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Abdallah Zaher" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-black">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="abdallahabusedo@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>This is your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-black">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormDescription>This is your job title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Add Skills */}
            <FormField
              control={form.control}
              name="skills"
              rules={{ required: "At least one skill is required" }}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-black">Skills</FormLabel>
                  <MultipleSelector
                    options={OPTIONS}
                    defaultOptions={OPTIONS}
                    placeholder="Select frameworks you like..."
                    {...field}
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              rules={{
                required: "Age is required",
                min: { value: 18, message: "Minimum age is 18" },
                max: { value: 65, message: "Maximum age is 65" },
              }}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-black">Age</FormLabel>
                  <FormControl>
                    <Input placeholder="25" {...field} />
                  </FormControl>
                  <FormDescription>This is your age.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Invalid phone number",
                },
              }}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-black">Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="01111111111" {...field} />
                  </FormControl>
                  <FormDescription>This is your phone number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              onClick={form.handleSubmit(onSubmit)}
              type="submit"
              className="bg-green-500 hover:bg-green-400"
            >
              {emp ? "Edit Employee" : "Add Employee"}
            </Button>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditEmpModal;
