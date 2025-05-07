import { usePharmacyShifts } from "@/pages/dashboard/pharmacy/api/queries";
import { Employee } from "@/pages/dashboard/employees/employee.types";
import {
  editEmployeeSchema,
  EditEmployeeValues,
} from "@/pages/dashboard/employees/employee-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { useEditEmployee } from "@/pages/dashboard/employees/api/mutations";
// if you have one

interface EditEmployeeProps {
  employee: Employee;
  setIsOpen: (state: boolean) => void;
}

const EditEmployeeForm = ({ employee, setIsOpen }: EditEmployeeProps) => {
  const { user, age, gender, salary, shift } = employee;
  const { shifts, isLoadingShifts } = usePharmacyShifts();
  const { editEmployee, isEditingEmployee } = useEditEmployee();

  const form = useForm<EditEmployeeValues>({
    resolver: zodResolver(editEmployeeSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      id: user.id,
      age,
      gender,
      salary,
      shiftId: shift.id,
      role: "EMPLOYEE",
    },
  });

  const onSubmit = (values: EditEmployeeValues) => {
    console.log("Edit values:", values);

    editEmployee(values);
    setIsOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="male" />
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="female" />
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-6">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      {field.value || "Select Role"}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EMPLOYEE">Employee</SelectItem>
                      <SelectItem value="MANAGER">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shiftId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shift</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    defaultValue={field.value?.toString()}
                  >
                    <SelectTrigger>
                      {shifts?.find((s) => s.id === field.value)?.name ||
                        "Select Shift"}
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingShifts ? (
                        <div className="p-2 text-center">
                          <Spinner className="animate-spin" />
                        </div>
                      ) : (
                        shifts?.map((shift) => (
                          <SelectItem
                            key={shift.id}
                            value={shift.id.toString()}
                          >
                            {shift.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
};

export default EditEmployeeForm;
