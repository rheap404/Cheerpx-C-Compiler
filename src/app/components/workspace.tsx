'use client';

import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import Split from '@uiw/react-split';

export default function Workspace({ question }) {
  const [code, setCode] = useState(`# Write your Python code for ${question.title}`);
  return (
    <div className="flex bg-black">
      <Split
        className="w-full h-screen m-4"
        style={{ height: 750, border: '1px solid #ffffff1a', borderRadius: 3 }}
      >
        <div style={{ minWidth: 60, width: 400 }} className="flex flex-col text-white m-4 mx-4">
          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          <p className="mt-4 text-lg whitespace-break-spaces">{question.description}</p>
          <div className="flex flex-col gap-6 mt-10">
            <h1 className="text-xl font-bold mb-4">Example</h1>
            <p className="gap-2"><h3 className="font-bold">Input:</h3> {question.example.input}</p>
            <p className="gap-2"><h3 className="font-bold">Output:</h3>  {question.example.input}</p>
          </div>
        </div>
        
        <div style={{ minWidth: 80, flex: 1 }} className="text-white m-4 mx-4">
          <h2 className="text-xl font-bold mb-4">Code Editor</h2>
          <CodeMirror
            value={code}
            height="620px"
            extensions={[python()]}
            theme="dark"
            onChange={(value) => setCode(value)}
            className="p-1 text-sm mt-8" 
          />
        </div>
      </Split>
    </div>
  );
}
