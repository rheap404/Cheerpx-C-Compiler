import { questions } from '../data/questions';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col m-52 gap-16">
        <div className="flex justify-start items-center ">
          <h1 className="text-5xl font-bold">Run your code client-side.</h1>
        </div>
        <div className="flex gap-5 flex-col">
        {questions.map((question) => (
          <Link key={question.id} href={`/questions/${question.id}`} passHref>
            <h1 className="text-xl text-blue-500">{question.title}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
