import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { WordFrequency } from "@/lib/sortWords";
import { useMemo, useState } from "react";

const Ranking = ({ data }: { data: WordFrequency[] }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter-Logik
  const filteredWords = useMemo(() => {
    return data.filter((item) =>
      item.word.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data, searchTerm]);

  return (
    <div>
      <Input
        placeholder='Wort filtern...'
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        className='max-w-sm mb-3'
      />

      <Table>
        <TableHeader>
          <TableRow className='bg-orange-950 text-white'>
            <TableHead className='bold text-lg'>Wort</TableHead>
            <TableHead className='bold text-lg'>Anzahl</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredWords.map((wordFreq) => (
            <TableRow key={wordFreq.word}>
              <TableCell>{wordFreq.word}</TableCell>
              <TableCell>{wordFreq.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Ranking;
