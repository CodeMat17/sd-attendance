import Image from "next/image";

const Loading = () => {
  return (
    <div className='px-8 flex flex-col items-center justify-center gap-3 w-full mt-32'>
      <Image
        alt='loading image'
        priority
        width={120}
        height={120}
        src='/truck.gif'
        className='rounded-full'
      />
      <p className='text-center tracking-wider text-gray-400'>Please wait!</p>
    </div>
  );
};

export default Loading;
