'use client';
import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import Split from '@uiw/react-split';

export default function Workspace({ question }) {
  const [code, setCode] = useState(`# Write your Python code for ${question.title}`);
  const [consoleVisible, setConsoleVisible] = useState(false);
  const [output, setOutput] = useState("");
  const [cheerpXLoaded, setCheerpXLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cxrtnc.leaningtech.com/1.0.0/cx.js";
    script.async = true;
    script.onload = () => {
      setCheerpXLoaded(true);
    };
    document.body.appendChild(script);
    
    return () => {
      // Clean up by removing the script if needed
      document.body.removeChild(script);
    };
  }, []);

  const handleRunCode = async () => {
    if (!cheerpXLoaded) {
      console.error('CheerpX is not loaded yet.');
      return;
    }
    
    try {
      const dataDevice = await CheerpX.DataDevice.create();
  
      const cx = await CheerpX.Linux.create({
        mounts: [
          { type: 'dir', path: '/data', dev: dataDevice },
          { type: 'devs', path: '/dev' },
        ],
      });
  
      const command = `/bin/bash -c 'python3 -c "${code}"'`;
      const result = await cx.run("/bin/bash", [
                                    "-c",
                                    command,
                                  ]);
  
      // setOutput(result);
    } catch (error) {
      setOutput('Error running code');
      console.error('Failed to execute code:', error);
    }
  
    setConsoleVisible(true); 
  };

  return (
    <div className="min-h-screen p-8">
      <Split
        className="w-full h-screen m-4 rounded-lg shadow-lg overflow-hidden"
        style={{ height: 900, border: '1px solid #1a1a1a', borderRadius: 3 }}
      >
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

        <div className="text-gray-300 bg-gray-800 p-6 rounded-lg shadow-md min-w-[80px] flex-1">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Code Editor
          </h2>
          <CodeMirror
            value={code}
            height="400px"
            extensions={[python()]}
            theme="dark"
            onChange={(value) => setCode(value)}
            className="p-2 text-sm mt-4 border border-gray-800 rounded-lg focus:border-blue-500 transition-all duration-200"
          />
          {consoleVisible && (
            <div className="bg-gray-900 p-4 mt-5 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold">Test Case:</h3>
                  <textarea
                    className="w-full h-24 bg-gray-800 p-2 rounded-lg focus:outline-none"
                    value={question.example.input}
                    readOnly
                  />
                </div>
                <div>
                  <h3 className="font-bold">Output:</h3>
                  <pre>{output}</pre>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleRunCode}
            className="mt-4 bg-green-500 p-2 rounded-md"
          >
            Run Code
          </button>

          <button
            onClick={() => setConsoleVisible(!consoleVisible)}
            className="mt-6 text-gray-300 bg-gray-700 p-2 rounded-md"
          >
            {consoleVisible ? "Hide Console" : "Show Console"}
          </button>
        </div>
      </Split>
    </div>
  );
}
