import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormMessage,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { shiftSchema, ShiftValues } from "@/pages/dashboard/pharmacy/lib/shift-schema";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TimePickerDemo } from "@/components/time-picker-demo";
import { useCreateShift } from "@/pages/dashboard/pharmacy/api/mutations";


const midnight = new Date();
midnight.setHours(0, 0, 0, 0);

const AddShiftForm = () => {
  const form = useForm<ShiftValues>({
    resolver: zodResolver(shiftSchema),
    defaultValues: {
      name: "",
      startTime: midnight,
      endTime: midnight,
    },
  });
  const { createShift, isCreatingShift } = useCreateShift();

  const onSubmit = (values: ShiftValues) => {
    const formatTime = (date: Date) =>
      `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

    const payload = {
      name: values.name,
      startTime: formatTime(values.startTime),
      endTime: formatTime(values.endTime),
    };

    createShift(payload);
    form.reset();
  };

  return (
    <Card className="rounded-md border bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Add Shift
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5"
          >
            {/* Shift Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">
                    Shift Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Night Shift" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start and End Time */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-700">
                      Start Time
                    </FormLabel>
                    <FormControl>
                      <TimePickerDemo
                        date={field.value}
                        setDate={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-700">
                      End Time
                    </FormLabel>
                    <FormControl>
                      <TimePickerDemo
                        date={field.value}
                        setDate={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={!form.formState.isValid || isCreatingShift}
                className="w-full sm:w-auto"
              >
                Create Shift
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddShiftForm;
