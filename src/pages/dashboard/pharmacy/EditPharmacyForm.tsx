import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  editPharmacySchema,
  EditPharmacyValues,
} from "@/validation/pharmacy-schema"; // adjust path

const EditPharmacyForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues: EditPharmacyValues;
  onSubmit: (values: EditPharmacyValues) => void;
}) => {
  const form = useForm<EditPharmacyValues>({
    resolver: zodResolver(editPharmacySchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Pharmacy name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Pharmacy address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expiryThreshold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry Threshold (days)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g. 30"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update Pharmacy</Button>
      </form>
    </Form>
  );
};

export default EditPharmacyForm;
