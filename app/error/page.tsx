import Image from "next/image";

export default function ErrorPage() {
  return (
    <div className='px-8 flex flex-col items-center justify-center mt-28'>
      <Image alt='' priority width={100} height={100} src='/404.gif' />
      <p className='text-center'>Sorry, something went wrong</p>
    </div>
  );
};


