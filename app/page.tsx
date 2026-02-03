import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col ">
     <Link href="/examplepage" className="m-4 p-4 bg-blue-500 text-white rounded">
        Go to Example Page
      </Link>
      <Link href="/testpage" className="m-4 p-4 bg-green-500 text-white rounded">
        Go to Test Page
      </Link>
      </div>
  );
}
