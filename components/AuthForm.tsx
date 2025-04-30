// How to create a form ?
// 0.  npx shadcn@latest add button form input sonner

// 1. import all of these
"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

// 5. import buttons
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

// 2. copy the schema
const authFormSchema = (type :FormType) =>{

  return z.object({
    name : type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email : z.string().email(),
    password : z.string().min(3),
  })
}






export const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  // 3. coppy this from documentation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:""
    },
  });

  // 4. coppy this from documentation
  function onSubmit(values: z.infer<typeof formSchema>) {
    try{

      if(type === "sign-up"){
        toast.success(`Account created sucessfully. Please sign in`)
        router.push('/sign-in')
      }
      else{
        toast.success(`Sign in sucessfully.`)
        router.push('/')
      }

    }
    catch (error){
      console.log(error);
      toast.error(`There was an ${error}`)
    }
  }

  const isSignIn = type === "sign-in";

  return (
    // 5. define the actual form in jsx copy
    <div className="card-border lg:min-w-[566px">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Pratice Job Interview With AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField 
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your name"
              />
            )}
            <FormField 
                control={form.control}
                name="email"
                label="Email"
                placeholder="Your email adderes"
                type="email"
              />
              <FormField 
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
              />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign in" : "Create an Account"}
            </Button>

          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account Yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
};
