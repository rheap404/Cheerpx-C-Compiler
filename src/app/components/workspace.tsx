'use client';

import React from "react";
import Split from '@uiw/react-split';

export default function Workspace({ question }) {
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
          <pre className="bg-gray-800 mt-8 p-2 rounded-md">
            <code className="text-sm">{`// Your code goes here for ${question.title}`}</code> 
          </pre>
        </div>
      </Split>
    </div>
  );
}
