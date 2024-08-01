"use client";

import { createClient } from "@/utils/supabase/client";
import { PowerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const SignOut = () => {
  const supabase = createClient();
  const router = useRouter();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.refresh();
      router.push("/login");
    }
  };

  return (
    <Button
      size='icon'
      variant='outline'
      onClick={logout}
      className='rounded-full text-red-500'>
      <PowerIcon />
    </Button>
  );
};

export default SignOut;
