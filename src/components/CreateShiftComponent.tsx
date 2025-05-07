import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { shiftSchema, ShiftValues } from "@/pages/dashboard/pharmacy/lib/shift-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

export const CreateShiftComponent = () => {
  const [shifts, setShifts] = useState<ShiftValues[]>([]);

  const form = useForm<ShiftValues>({
    resolver: zodResolver(shiftSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: ShiftValues) => {
    const newShift: ShiftValues = {
      name: data.name,
      startTime: { hour: data.startTime.hour },
      endTime: { hour: data.endTime.hour },
    };
    setShifts((prev) => [...prev, newShift]);
    form.reset();
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">Shifts</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-sm">Add Shift</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Shift</DialogTitle>
              <DialogDescription>
                Fill in the shift name and working hours. Hours should be in
                24-hour format (e.g., 9 to 17).
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <Form {...form}>
              <form
                className="space-y-3"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Shift name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-sm text-gray-500">
                  Times are in 24-hour format.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="startTime.hour"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start time</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Start time"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endTime.hour"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End time</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="End time"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogClose asChild>
                  <Button
                    disabled={!form.formState.isValid}
                    type="submit"
                    className="w-full"
                  >
                    Save Shift
                  </Button>
                </DialogClose>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {shifts.length > 0 ? (
          shifts.map((shift, index) => (
            <div key={index} className="flex space-x-2 rounded-sm border p-2">
              <span className="font-semibold">{shift.name}</span>
              <div className="space-x-1">
                <span>{shift.startTime.hour}</span>
                <span>-</span>
                <span>{shift.endTime.hour}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">Add New Shifts</div>
        )}
      </div>
    </>
  );
};
