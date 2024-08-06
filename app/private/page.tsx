import AttendanceDays from "@/components/AttendanceDays";
import CompleteProfileForm from "@/components/CompleteProfileForm";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function PrivatePage() {
  const supabase = createClient();

  const { data: auth_data, error: auth_error } = await supabase.auth.getUser();
  if (auth_error || !auth_data?.user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("sd_attendance")
    .select("id, name, email, reg_no")
    .eq("id", auth_data?.user?.id)
    .single();

  if (error) {
    console.error("Error fetching data: ", error);
    return null;
  }

  if (data) {
    if (data.name === null || data.email === null || data.reg_no === null) {
      return (
        <div className='px-4 py-20 flex flex-col justify-center w-full max-w-md mx-auto'>
          <div className='flex justify-center'>
            <Image
              alt=''
              priority
              width={80}
              height={80}
              src='/complete.gif'
              className='rounded-xl'
            />
          </div>

          <h1 className='text-center text-2xl font-medium'>
            Complete your profile setup
          </h1>

          <CompleteProfileForm
            id={auth_data.user.id}
            email={auth_data?.user?.email || ""}
          />
        </div>
      );
    }
  }

  return (
    <div className='px-4 py-8 w-full min-h-screen max-w-6xl mx-auto xl:px-0'>
      <div className='flex justify-center'>
        <Image
          alt=''
          priority
          width={80}
          height={80}
          src='/student.gif'
          className='rounded-lg'
        />
      </div>
      <h2 className='mt-4 text-center text-xl font-medium'>{data.name}</h2>
      <p className='text-center text-gray-400'>Software Development Course</p>
      <p className='text-center text-gray-400'>{data.reg_no}</p>
      <div className='mt-8'>
        <p className='text-center text-lg text-sky-500 uppercase'>Attendance</p>
        <div className='text-sm mt-4'>
          <AttendanceDays id={auth_data?.user?.id} />

          {/* {regno.includes(data.reg_no) ? (
            <div>
              <AttendanceDays id={auth_data?.user?.id} />
            </div>
          ) : (
            <div className='w-full max-w-md mx-auto flex flex-col items-center mt-6 gap-4'>
              <Image
                alt=''
                priority
                width={80}
                height={80}
                src='/fail.gif'
                className='rounded-full'
              />
              <p className='text-center text-[16px] text-gray-400 '>
                You are not provisioned to be in this class or you refused to
                submit your data when it was asked for in the WhatsApp group.
              </p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
