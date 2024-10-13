'use client';
import React, { useEffect, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import Split from '@uiw/react-split';

export default function Workspace({ question }) {
  const consoleRef = useRef(null);
  const [code, setCode] = useState(`# Write your Python code for ${question.title}`);
  const [consoleVisible, setConsoleVisible] = useState(false); // Toggle for console visibility
  const [output, setOutput] = useState(""); // Store the output of the code
  const [cheerpXInstance, setCheerpXInstance] = useState(null); // State to hold the CheerpX instance

  useEffect(() => {
    const loadCheerpX = async () => {
      // Dynamically load the CheerpX script
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

          // Set console output to your output area
          if (consoleRef.current) {
            console.log("Console Ref:", consoleRef.current);
            cheerpx.setConsole(consoleRef.current);
          }
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
  

  
  const handleRunCode = async () => {
    if (cheerpXInstance) {
      try {
        // Directly update the state inside stdout.write
        const stdout = {
          write: (data) => {
            console.log("Received stdout data:", data); // Check if data is captured
            if (data) {
              setOutput((prevOutput) => prevOutput + data);
            } else {
              console.log("No data received.");
            }
          },
        };
  
        const result = await cheerpXInstance.run("/usr/bin/python3", ["-c", code], {
          env: ["PATH=/usr/bin:/bin"],
          cwd: "/app", 
          stdout, 
        });
        

  
      } catch (error) {
        console.error("Failed to run code:", error);
        setOutput("Error: " + error.message); // Show error in the UI
      }
    } else {
      console.error("CheerpX instance is not initialized.");
      setOutput("Error: CheerpX instance not initialized.");
    }
  };
  
  

  return (
    <div className="min-h-screen p-8">
      <Split
        className="w-full h-screen m-4 rounded-lg shadow-lg overflow-hidden"
        style={{ height: 900, border: '1px solid #1a1a1a', borderRadius: 3 }}
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
          {/* Console Output */}
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
                <div id='console' ref={consoleRef}>
                  <h3 className="font-bold">Output:</h3>
                  <p className="text-white">{output}</p>
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

          {/* Toggle Console */}
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
