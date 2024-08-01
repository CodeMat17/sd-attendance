// "use client";

import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import SignOut from "./SignOut";

const Header = async () => {
  const supabase = createClient();
  // const router = useRouter();

  const { data, error } = await supabase.auth.getUser();

  return (
    <nav className='px-4 py-2.5 sticky top-0 z-50 bg-gray-900'>
      <div className='w-full max-w-6xl mx-auto flex items-center justify-between'>
        <div className='p-0.5 bg-gray-700 rounded-lg'>
          <Image
            alt='logo'
            priority
            width={40}
            height={40}
            src={data?.user ? "/laptop.gif" : "/laptop.png"}
            className=''
          />
        </div>

        <SignOut email={data?.user?.email} />
      </div>
    </nav>
  );
};

export default Header;
