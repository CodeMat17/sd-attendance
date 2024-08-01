"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createClient } from "@/utils/supabase/client";
import { MinusIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

const SignOut = ({ email }: { email: string | undefined }) => {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.refresh();
      router.push("/login");
    }
    setLoading(false);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size='icon'
            variant='ghost'
            className='rounded-full text-red-500'>
            {/* <PowerIcon /> */}
            <Image alt='' priority width={30} height={30} src='/user.png' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='mr-4'>
          <div className='space-y-1'>
            <div className='flex items-center gap-4'>
              <Image
                alt=''
                priority
                width={30}
                height={30}
                src='/user.gif'
                className='rounded-full'
              />
              <p className='text-xs'>{email}</p>
            </div>

            <Button
              onClick={logout}
              size='icon'
              variant='ghost'
              className='w-full text-start flex justify-start gap-4'>
              <Image
                alt=''
                priority
                width={30}
                height={30}
                src='/power.gif'
                className='rounded-full'
              />
              <p className=''>Sign out</p>
              {loading && <MinusIcon className='animate-spin' />}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      {/* <Button
     
        onClick={logout}
        className='rounded-full text-red-500'>
        <PowerIcon />
      </Button> */}
    </>
  );
};

export default SignOut;
