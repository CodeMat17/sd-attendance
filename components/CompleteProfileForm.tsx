"use client";

import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { MinusIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  id: string;
  email: string;
};

const FormSchema = z.object({
  name: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  reg_no: z.string().min(14, {
    message: "Reg no. must be at least 14 characters.",
  }),
});

const CompleteProfileForm = ({ email, id }: Props) => {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      reg_no: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      setErrorMsg("");
      setLoading(true);

      const { data, error } = await supabase
        .from("sd_attendance")
        .update({ ...values, email })
        .eq("id", id)
        .select();

      if (error) {
        setErrorMsg(error.message);
      }

      if (!error) {
        toast("Your profile is successfully updated!");
        router.refresh();
        revalidatePath("/private", "layout");
      }
    } catch (error) {
      console.log("ErrorMsg: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      {errorMsg && (
        <p className='text-sm p-3 text-red-500 bg-red-500/10 text-center mt-6 rounded-xl'>
          {errorMsg}
        </p>
      )}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full mt-1.5 space-y-3'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your full name'
                  {...field}
                  className='w-full bg-gray-900'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='reg_no'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reg. no</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your reg. no'
                  {...field}
                  className='w-full bg-gray-900'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          type='submit'
          className='w-full bg-sky-500 hover:bg-sky-700 text-white'>
          {loading ? <MinusIcon className='animate-spin' /> : "Update"}
        </Button>
      </form>
    </Form>
  );
};

export default CompleteProfileForm;
