import { Button } from '@/components/ui/button'
import Link from 'next/link';
import React from 'react'

const Home = () => {
  return (
    <div className='px-4 pb-12 pt-32 flex flex-col justify-center items-center max-w-xl mx-auto gap-6'>
      <p className='text-lg'>Welcome to</p>
      <h1 className='text-center text-pretty text-3xl font-medium'>
        <span className='text-sky-500'>SAM</span> |{" "}
        <span className='text-sky-500'>Software Development</span> Course <span className='text-sky-500'>Attendance Register</span>.
      </h1>
      <div className='mt-8'>
        <Button asChild>
          <Link href='/login'>SignUp / SignIn</Link>
          </Button>
    
      </div>
    </div>
  );
}

export default Home