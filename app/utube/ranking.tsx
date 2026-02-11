import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { VideoApiResponse } from "@/lib/types/global";

const Ranking = (data: VideoApiResponse) => {
  return (
    <>
      <h2 className='text-2xl font-bold mb-4'>{data.metaData.title}</h2>
      <p className='mb-2'>Autor: {data.metaData.author_name}</p>
      <p className='mb-4'>Anzahl Wörter: {data.wordFrequency.length}</p>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow className='bg-orange-950 text-white'>
            <TableHead className='bold text-lg'>Wort</TableHead>
            <TableHead>Anzahl</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.wordFrequency.map((wordFreq) => (
            <TableRow key={wordFreq.word}>
              <TableCell>{wordFreq.word}</TableCell>
              <TableCell>{wordFreq.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
export default Ranking;
