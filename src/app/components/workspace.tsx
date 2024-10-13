'use client';
import React, { useEffect, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import Split from '@uiw/react-split';

export default function Workspace({ question }) {
  const consoleRef = useRef(null);
  const [code, setCode] = useState(`# Write your Python code for ${question.title}`);
  const [consoleVisible, setConsoleVisible] = useState(false); 
  const [output, setOutput] = useState(""); 
  const [cheerpXInstance, setCheerpXInstance] = useState(null); 

  useEffect(() => {
    const loadCheerpX = async () => {
      const script = document.createElement('script');
      script.src = "https://cxrtnc.leaningtech.com/1.0.0/cx.js";
      script.async = true;
      document.body.appendChild(script);

          script.onload = async () => {
            try {
              const cloudDevice = await CheerpX.CloudDevice.create(
                "wss://disks.webvm.io/debian_large_20230522_5044875331.ext2"
              );
              const idbDevice = await CheerpX.IDBDevice.create("block");
              const overlayDevice = await CheerpX.OverlayDevice.create(cloudDevice, idbDevice);
              const webDevice = await CheerpX.WebDevice.create("");
              const dataDevice = await CheerpX.DataDevice.create();

      
              const cheerpx = await CheerpX.Linux.create({
                mounts: [
                  { type: "ext2", path: "/", dev: overlayDevice },
                  { type: "dir", path: "/app", dev: webDevice },
                  { type: "dir", path: "/data", dev: dataDevice },
                  { type: "devs", path: "/dev" },
                ],
              });
      
          console.log("CheerpX instance created:", cheerpx);

          setCheerpXInstance(cheerpx);

        } catch (error) {
          console.error("Failed to initialize CheerpX:", error);
        }
      };

      script.onerror = (error) => {
        console.error("Error loading CheerpX script:", error);
      };
    };

    loadCheerpX();
  }, []); 
  

  useEffect(() => {
    if (cheerpXInstance && consoleRef.current) {
      cheerpXInstance.setConsole(consoleRef.current);
      console.log("Console set successfully.");
    }
  }, [cheerpXInstance, consoleVisible]);

  const handleRunCode = async () => {
    if (cheerpXInstance) {
      try {
        const result = await cheerpXInstance.run("/usr/bin/python3", ["-c", code], {
          env: ["PATH=/usr/bin:/bin"],
          cwd: "/app",
        });

        console.log("CheerpX run result:", result);

      } catch (error) {
        console.error("Failed to run code:", error);
        setOutput("Error: " + error.message); 
      }
    } else {
      console.error("CheerpX instance is not initialized.");
      setOutput("Error: CheerpX instance not initialized.");
    }
  };
 
  

  return (
    <div className="w-full -mt-8 p-8">
      <Split
        className="w-full m-4 rounded-lg shadow-lg"
        style={{ height: 900, border: '1px solid #1a1a1a' }}
      >
        {/* Left Panel: Instructions */}
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

        {/* Right Panel: Code Editor and Console */}
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
          <div className="flex mt-4 w-full gap-4 justify-end">
            <button
              onClick={handleRunCode}
              className=" bg-green-700 p-2 rounded-md"
              >
              Run Code
            </button>

            <button
              onClick={() => setConsoleVisible(!consoleVisible)}
              className=" text-gray-300 bg-gray-700 p-2 rounded-md"
              >
              {consoleVisible ? "Hide Console" : "Show Console"}
            </button>
          </div>

             {/* Console Output */}
             {consoleVisible && (
              <div className="bg-gray-900 p-4 mt-5 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold">Test Case:</h3>
                  <textarea
                    className= "mt-4 w-full h-24 bg-gray-800 p-2 rounded-lg focus:outline-none"
                    value={question.example.input}
                    readOnly
                  />
                </div>
                <div >
                  <h3 className="font-bold">Output:</h3>
                  <pre ref={consoleRef} className="mt-4 p-2 pb-6 text-white">{output}</pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </Split>
    </div>
  );
}
