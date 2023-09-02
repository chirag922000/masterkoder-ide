// import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight";
import "./code.css";
// import Spinner from "react-bootstrap/Spinner";
import useStorage from "../LocalStorage"
// import { useLocation } from 'react-router-dom';

function Home() {
  const [htmlCode, setHtmlCode] = useStorage("htmlCode", "");
  const [cssCode, setCssCode] = useStorage("cssCode", "");
  const [jsCode, setJsCode] = useStorage("jsCode", "");
  const [projectName, setProjectName] = useStorage("projectName", "");
  const [isLoading, setIsLoading] = useState(false);





  const clearScreen = () => {
    const iframe = document.querySelector("#output");
    iframe.setAttribute("src", "");
    iframe.contentDocument.body.innerHTML = "";
  };

  const saveProject = async () => {
    if (!projectName || (!htmlCode && !cssCode && !jsCode)) {
      alert("please write project name and some code to save project");
    } else {
      setIsLoading(true);
      try {
        const response = await fetch(" /save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: projectName,
            html: htmlCode,
            css: cssCode,
            js: jsCode,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setIsLoading(false);
          alert("Project Saved Successfully")
        } else {
          // Handle error cases
          if (response.status === 400 && data.message.includes('Maximum project limit reached')) {
            // Show a custom alert for reaching the project limit
            alert("You have reached the maximum limit of 3 projects.");
          } else {
            // Show a generic error alert for other errors
            alert("An error occurred while saving the project.");
          }
        }

        return data;
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  const openFullscreen = () => {
    const iframe = document.querySelector("#output");
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };


  const run = () => {
    const iframe = document.getElementById("output");
    const output = iframe.contentWindow || iframe.contentDocument.document || iframe.contentDocument;

    const html = `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `;

    output.document.open();
    output.document.write(html);
    output.document.close();
  };

  const clearAll = () => {
    setHtmlCode("");
    setCssCode("");
    setJsCode("");
    const iframe = document.querySelector("#output");
    iframe.setAttribute("src", "");
    iframe.contentDocument.body.innerHTML = "";
  };

  return (
    <div className='code-body'>
      <div className="editor-container">
        <AceEditor
          className="editor html-editor"
          setOptions={{ useWorker: false }}
          mode="html"
          theme="twilight"
          placeholder='html'
          onChange={(newCode) => setHtmlCode(newCode)}
          value={htmlCode}
          name="html-code"
          editorProps={{ $blockScrolling: true }}
          style={{ width: "33%", resize: "horizontal" }}
          fontSize={16}
        />

        <AceEditor
          className="editor  "
          setOptions={{ useWorker: false }}
          mode="css"
          theme="twilight"
          placeholder='css'
          onChange={(newCode) => setCssCode(newCode)}
          value={cssCode}
          name="css-code"
          editorProps={{ $blockScrolling: true }}
          style={{width: "33%", resize: "horizontal" }}
          fontSize={16}
        />

        <AceEditor
          className="editor  "
          setOptions={{ useWorker: false }}
          mode="javascript"
          theme="twilight"
          placeholder='javascript'
          onChange={(newCode) => setJsCode(newCode)}
          value={jsCode}
          name="js-code"
          editorProps={{ $blockScrolling: true }}
          style={{width: "33%", resize: "horizontal" }}
          fontSize={16}
        />
      </div>
      <div className='buttons-group-ide'>
        <button style={{ padding: "5px 50px" }} onClick={run} className="button-30 " >
          Run
        </button>

        <input
          className="project-name"
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          maxLength={24}
        />

        <button className="button-30 " onClick={saveProject}>
          Save code
        </button>

        <button className="button-30 " onClick={clearAll} >
          Clear all
        </button>
        <button className="button-30 " onClick={clearScreen} >
          Clear screen
        </button>
        <button className="button-30 full-screen" onClick={openFullscreen} >
          Full Screen
        </button>
      </div>
      <div className="output">
        <iframe id="output" title="Output"  ></iframe>
      </div>
    </div>

  );
}

export default Home;
