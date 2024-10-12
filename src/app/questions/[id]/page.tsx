'use client';

import { useRouter } from 'next/navigation';
import { questions } from '../../../data/questions'; 
import Workspace from '../../components/workspace';

export default function QuestionPage({ params }) {
  const { id } = params; 
  const question = questions.find((q) => q.id === Number(id)); 

  if (!question) {
    return <div className="text-white">Question not found</div>;
  }

  return (
    <div>
      <div className="flex justify-between text-white bg-outline">
        <div className="flex justify-center items-center mx-4 gap-2">
          <a href="/">
            <button className="bg-gray-800 rounded-full text-sm p-4 m-2 h-6 w-6 flex justify-center items-center">
              x
            </button>
          </a>
          <h1 className="text-lg font-bold">{question.title}</h1> 
        </div>
        <button className="bg-yellow-500 opacity-50 p-1 px-4 m-3 text-black rounded-md">Done</button>
      </div>
      
      <Workspace question={question} /> 
    </div>
  );
}
