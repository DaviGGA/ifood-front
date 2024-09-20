import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CarouselApi } from "@/components/ui/carousel";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { createAccount } from "@/api/create-account";
import { useAccountCreate } from "../providers/account-create-provider";

type Props = {
  carouselApi: CarouselApi
}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).refine(value => {
    return /\d/.test(value);
  }, {message: "Field must contain at least a digit"}).
  refine( value => {
    return /[^\w\s]/.test(value);
  }),
  confirmPassword: z.string()
}).refine( data => data.password == data.confirmPassword, 
  {message : "Passwords don't match each other"})

export function CreateAccount(props: Props) {

  const accountCreate = useAccountCreate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  async function onSignUpClick (values: z.infer<typeof formSchema>) {  
    console.log(values);
    const response = await createAccount(values);
    accountCreate.setAccountId(response.data.accountId);
    if (response.status > 200 && response.status < 300) return;
    props.carouselApi?.scrollNext()
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-center">SIGN UP</h2>
      <p className="mb-8 text-sm text-center text-gray-600">Hungry? We deliver.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSignUpClick)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Your password" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm password" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary mt-5">Continue</Button>
        </form>

      </Form>
      <p className="mt-4 text-xs text-center text-gray-600">
          By clicking "Sign up" I agree to PLQ's{" "}
          <a href="#" className="underline">
          Terms of Service
          </a>
          .
      </p>
      <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="#" className="underline">
          Login
          </a>
      </p>
    </div>

  )
}

