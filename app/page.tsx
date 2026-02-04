import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className='flex flex-col '>
      <Button
        variant={"link"}
        className='m-4 p-4 bg-green-500 text-white rounded'>
        <Link href='/examplepage'>Go to Example Page</Link>
      </Button>
      <Link
        href='/testpage'
        className='m-4 p-4 bg-green-500 text-white rounded'>
        Go to Test Page
      </Link>
    </div>
  );
}
