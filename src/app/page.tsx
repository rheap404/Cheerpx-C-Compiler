import { questions } from '../data/questions';
import Link from 'next/link';
import { FaCode, FaSearch, FaStackOverflow } from 'react-icons/fa';

export default function Home() {
  const icons = [<FaCode />, <FaSearch />, <FaStackOverflow />];

  return (
    <div className="flex flex-col m-20 p-10 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-start items-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-300">Run your code client-side.</h1>
      </div>
      <div className="flex flex-col gap-4">
        {questions.map((question, index) => (
          <Link key={question.id} href={`/questions/${question.id}`} passHref>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:border-blue-500 hover:shadow-md transition-all duration-200 cursor-pointer">
              <span className="text-blue-500">{icons[index % icons.length]}</span>
              <h1 className="text-lg sm:text-xl font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600">
                {question.title}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}