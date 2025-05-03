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
import { signUpSchema, SignUpValues } from "@/validation/schema";
import useSignPortalContext from "@/hooks/useSignPortalContext";
import { useSignUpStore } from "@/store/signUpStore";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "@/services/auth/mutations";
import { Spinner } from "@/components/Spinner";

const SignUp = () => {
  const { signUp, isSigningIn } = useSignUp();
  const { setData } = useSignUpStore();
  const form = useForm<SignUpValues>({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      repassword: "",
      username: "",
    },
  });

  const navigate = useNavigate();

  const { setPortalParam } = useSignPortalContext();

  const onSubmit = async (data: SignUpValues) => {
    const { repassword, ...formData } = data;
    signUp(formData);
  };

  return (
    <Form {...form}>
      <form className="w-96 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>username</FormLabel>
              <FormControl>
                <Input className="bg-gray-200" placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="bg-gray-200" placeholder="Email" {...field} />
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
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="repassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="bg-gray-200"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800"
            disabled={isSigningIn}
          >
            {isSigningIn ? <Spinner /> : <span>Sign In</span>}
          </Button>
          <hr className="my-3" />
          <div className="space-y-0.5 text-center">
            <span className="font-light">Already have an account?</span>
            <span
              onClick={() => setPortalParam("sign-in")}
              className="cursor-pointer text-blue-500"
            >
              Login
            </span>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignUp;
