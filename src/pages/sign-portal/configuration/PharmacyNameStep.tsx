import { useForm } from "react-hook-form";
import { onboardingFormSchema, OnboardingValues } from "@/validation/schema";
import { useSignUpStore } from "@/store/signUpStore";
import {
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useSignUp } from "@/services/auth/mutations";

interface PharmacyNameFormProps {
  onNext: () => void;
}

export const PharmacyNameForm = ({ onNext }: PharmacyNameFormProps) => {
  const { data: signUpValues } = useSignUpStore();
  const { signUp } = useSignUp();
  const form = useForm<OnboardingValues>({
    mode: "onChange",
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      pharmacy: {
        name: "",
      },
    },
  });

  const onSubmit = (data: OnboardingValues) => {
    const formData = {
      ...signUpValues,
      pharmacy: data.pharmacy,
    };

    console.log("form-data", formData);
    signUp(formData);

    onNext(); // 👈 لما يضغط Next نروح لمرحلة ShiftTime
  };

  return (
    <div className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
          <FormField
            name="pharmacy.name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="pharmacyName" className="text-lg">
                  Pharmacy Name
                </FormLabel>
                <Input
                  id="pharmacyName"
                  placeholder="Enter pharmacy name"
                  className="rounded-sm"
                  {...field} // Linking the input with the form state
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="absolute right-5 bottom-0">Next</Button>
        </form>
      </Form>
    </div>
  );
};
