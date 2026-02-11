import Link from "next/link";

export default function Home() {
  return (
    <div className='flex flex-col '>
      <Link href='/utube' className='m-4 p-4 bg-green-500 text-white rounded'>
        Go to Utube Page
      </Link>
    </div>
  );
}
