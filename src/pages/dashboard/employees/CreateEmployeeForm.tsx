import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { usePharmacyShifts } from "@/services/pharmacy/queries";
import {
  createEmployeeSchema,
  CreateEmployeeValues,
} from "@/validation/employee-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const CreateEmployeeForm = () => {
  const { shifts, isLoadingShifts } = usePharmacyShifts();
  const form = useForm<CreateEmployeeValues>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      user: {
        username: "",
        email: "",
        password: "",
        managedUser: true, // hidden but required
      },
      age: 0,
      gender: "",
      roleId: 0,
      salary: 0,
      pharmacyId: 1234, // hidden but required
      shiftId: 0,
    },
  });

  // onSubmit handler
  const onSubmit = (data: z.infer<typeof createEmployeeSchema>) => {
    const finalData = {
      ...data,
      user: {
        ...data.user,
        managedUser: true, // inject value programmatically
      },
      pharmacyId: 1234, // inject value programmatically
    };

    // send finalData to backend
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="user.username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="user.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="user.password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter password"
                  type="password"
                  {...field}
                />
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
                <Input placeholder="Enter gender" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role ID</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
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
                <Input type="number" step="0.01" {...field} />
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
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger>
                    <span>
                      {field.value
                        ? shifts?.find((shift) => shift.id === field.value)
                            ?.name
                        : "Select a Shift"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingShifts ? (
                      <Spinner className="animate-spin" size={16} />
                    ) : (
                      shifts?.map((shift) => (
                        <SelectItem key={shift.id} value={shift.id.toString()}>
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateEmployeeForm;
