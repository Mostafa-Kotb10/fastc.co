import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  createPharmacySchema,
  CreatePharmacyValues,
} from "@/validation/pharmacy-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreatePharmacy } from "@/services/pharmacy/mutations";
import { FullScreenSpinner } from "@/components/Spinner";

const CreatePharmacyDialog = ({
  onlyBranch = false,
  pharmacyId,
}: {
  onlyBranch: boolean;
  pharmacyId?: number;
}) => {
  const { createPharmacy, isLoadingPharmacy } = useCreatePharmacy();

  console.log(pharmacyId);

  const form = useForm<CreatePharmacyValues>({
    resolver: zodResolver(createPharmacySchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      address: "",
      isBranch: true,
      expiryThreshold: 30,
    },
  });

  if (!pharmacyId) return <FullScreenSpinner />

  const onSubmit = (data: CreatePharmacyValues) => {
    const payload = {
      ...data,
      ...(onlyBranch ? { mainBranchId: pharmacyId } : {}),
    };

    console.log("Pharmacy Data", payload);
    createPharmacy(payload);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create Pharmacy</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Pharmacy</DialogTitle>
          <DialogDescription>
            Create a new pharmacy here, Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pharmacy Name*</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-sm"
                      placeholder="Pharmacy Name"
                      {...field}
                    />
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
                    <Input
                      className="rounded-sm"
                      placeholder="Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isBranch"
              render={({ field }) => (
                <FormItem className="flex w-fit items-center gap-3 rounded-sm border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Is this a branch?</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      className="rounded-sm"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={onlyBranch}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {onlyBranch && (
              <FormField
                control={form.control}
                name="mainBranchId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Branch ID</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-sm"
                        placeholder="Enter Main Branch ID"
                        {...field}
                        value={pharmacyId}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="expiryThreshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Threshold (days)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="rounded-sm"
                      placeholder="e.g. 30"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose
                disabled={!form.formState.isValid || isLoadingPharmacy}
                asChild
              >
                <Button type="submit">create</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePharmacyDialog;
