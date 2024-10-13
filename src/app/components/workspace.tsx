'use client';

import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import Split from '@uiw/react-split';

export default function Workspace({ question }) {
  const [code, setCode] = useState(`# Write your Python code for ${question.title}`);

  return (
    <div className=" min-h-screen p-8">
      <Split
        className="w-full h-screen m-4 rounded-lg shadow-lg overflow-hidden"
        style={{ height: 750, border: '1px solid #1a1a1a' }} /* Darker border */
      >
        {/* Left Panel */}
        <div className="flex flex-col bg-gray-800 text-gray-300 p-6 rounded-lg shadow-md min-w-[60px] w-[400px]">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Instructions
          </h2>
          <p className="mt-4 text-lg whitespace-pre-wrap">{question.description}</p>
          <div className="flex flex-col gap-6 mt-10">
            <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Example
            </h1>
            <div className="gap-2">
              <h3 className="font-bold">Input:</h3>
              <p className="text-gray-300">{question.example.input}</p>
            </div>
            <div className="gap-2">
              <h3 className="font-bold">Output:</h3>
              <p className="text-gray-300">{question.example.output}</p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="text-gray-300 bg-gray-800 p-6 rounded-lg shadow-md min-w-[80px] flex-1">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Code Editor
          </h2>
          <CodeMirror
            value={code}
            height="620px"
            extensions={[python()]}
            theme="dark"
            onChange={(value) => setCode(value)}
            className="p-2 text-sm mt-8 border border-gray-800 rounded-lg focus:border-blue-500 transition-all duration-200"
          />
        </div>
      </Split>
    </div>
  );
}