import Image from "next/image";

type SearchParamsProps = {
  searchParams: {
    message: string;
  };
};

const Confirm = ({ searchParams }: SearchParamsProps) => {
    return <div className="px-4 py-32 max-w-md mx-auto flex flex-col justify-center items-center">
        <Image alt="" priority width={100} height={100} src='/email.gif' className="rounded-full" />
        <p className="text-center mt-6">{searchParams.message}</p></div>;
};

export default Confirm;
