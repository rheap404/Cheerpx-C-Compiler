'use client';

import { useEffect } from 'react';

export default function TestPage() {
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
      });
    };

    const loadModules = async () => {
      try {
        // Load cx.js
        await loadScript("https://cxrtnc.leaningtech.com/1.0.0/cx.js");

        // Load cx.esm.js
        await loadScript("https://cxrtnc.leaningtech.com/1.0.0/cx.esm.js");

        // Access CheerpX globally
        const CheerpX = window.CheerpX;

        // Create devices and initialize
        const cloudDevice = await CheerpX.CloudDevice.create(
          "wss://disks.webvm.io/debian_large_20230522_5044875331.ext2"
        );
        const idbDevice = await CheerpX.IDBDevice.create("block1");
        const overlayDevice = await CheerpX.OverlayDevice.create(cloudDevice, idbDevice);
        const webDevice = await CheerpX.WebDevice.create("");
        const dataDevice = await CheerpX.DataDevice.create();

        const cx = await CheerpX.Linux.create({
          mounts: [
            { type: "ext2", path: "/", dev: overlayDevice },
            { type: "dir", path: "/app", dev: webDevice },
            { type: "dir", path: "/data", dev: dataDevice },
            { type: "devs", path: "/dev" },
          ],
        });

        cx.setConsole(document.getElementById("console"));
      } catch (error) {
        console.error("Error loading CheerpX:", error);
      }
    };

    loadModules();

    return () => {
      // Cleanup logic if necessary
    };
  }, []);

  return (
    <div style={{ height: '100%', background: 'black' }}>
      <pre id="console" style={{ height: '100%' }}></pre>
    </div>
  );
}
