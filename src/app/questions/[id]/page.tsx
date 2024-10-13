'use client';

import { useRouter } from 'next/navigation';
import { questions } from '../../../data/questions';
import Workspace from '../../components/workspace';

export default function QuestionPage({ params }) {
  const { id } = params;
  const question = questions.find((q) => q.id === Number(id));

  if (!question) {
    return (
      <div className="text-gray-300 bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg">
        Question not found
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-900 p-8">
      <div className="flex text-gray-300 bg-gray-800 shadow-lg rounded-lg p-4">
        <div className="flex justify-center items-center gap-4">
          <a href="/">
            <button className="bg-blue-600 text-white rounded-full text-lg p-2 h-6 w-6 flex justify-center items-center hover:bg-gray-700 transition-all duration-200">
              x
            </button>
          </a>
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{question.title}</h1>
        </div>
      </div>

      <Workspace question={question} />
    </div>
  );
}
