import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signInSchema, SignInValues } from "@/pages/sign-portal/portal-schema";
import useSignPortalContext from "@/hooks/useSignPortalContext";
import { useSignInV2 } from "@/services/auth/mutations";
import { Spinner } from "@/components/Spinner";

const SignIn = () => {
  const {signIn, isPending } = useSignInV2();

  const form = useForm<SignInValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const { setPortalParam } = useSignPortalContext();

  const onSubmit = (data: SignInValues) => {
    signIn(data);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input
                  className="bg-gray-200"
                  placeholder="Email or phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="bg-gray-200"
                  placeholder="Password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-6">
          <div className="space-y-6">
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800"
              disabled={isPending}
            >
              {isPending ? (
                <Spinner />
              ) : (
                <span>Sign In</span>
              )}
            </Button>

            <hr />
          </div>

          <div className="space-y-4 text-center">
        
            <span>Don't have an account? </span>
            <span
              onClick={() => setPortalParam("sign-up")}
              className="cursor-pointer text-blue-500"
            >
              Sign up now
            </span>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignIn;
