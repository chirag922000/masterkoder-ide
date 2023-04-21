import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight";
import "./home.css";
import Spinner from "react-bootstrap/Spinner";
import useStorage from "./LocalStorage"
// import { useLocation } from 'react-router-dom';

function Home() {
  const [htmlCode, setHtmlCode] = useStorage("htmlCode","");
  const [cssCode, setCssCode] = useStorage("cssCode","");
  const [jsCode, setJsCode] = useStorage("jsCode","");
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(( ) => {
    //  verifyUser()

    if (id) {
      const getProducts = async () => {
        try {
          let result = await fetch(`/fiddles/${id}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          result = await result.json();

          const project = result.projects.find((p) => p._id.toString() === id);
          if (!project) {
            const allprojects = result.allprojects.find(
              (p) => p._id.toString() === id
            );
            setHtmlCode(allprojects.html);
            setCssCode(allprojects.css);
            setJsCode(allprojects.js);
            setProjectName(allprojects.name);
          } else {
            setHtmlCode(project.html);
            setCssCode(project.css);
            setJsCode(project.js);
            setProjectName(project.name);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getProducts();
    }

    // Auto-save feature
    // const saveInterval = setInterval(() => {
      // saveProject()
    // }, 3000000);  
    // return () => clearInterval(saveInterval);
  }, [id]);

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
    try {
      const iframe = document.querySelector("#output");
      // const sanitizedHtml = DOMPurify.sanitize(htmlCode);
      iframe.contentDocument.body.innerHTML =
        htmlCode + "<style>" + cssCode + "</style>";

      iframe.contentWindow.eval(jsCode);
    } catch (error) {
      console.log(error);
      alert("syntax error");
    }
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
    <div>
     
      <div className="editor-container">
        <AceEditor
        language="Html"
         className="editor"
          setOptions={{ useWorker: false }}
          mode="html"
          theme="twilight"
          onChange={(newCode) => setHtmlCode(newCode)}
          value={htmlCode}
          name="html-code"
          editorProps={{ $blockScrolling: true }}
          style={{ resize: "both" }}
          fontSize={16}
        />

        <AceEditor
         className="editor"
          setOptions={{ useWorker: false }}
          mode="css"
          theme="twilight"
          onChange={(newCode) => setCssCode(newCode)}
          value={cssCode}
          name="css-code"
          editorProps={{ $blockScrolling: true }}
          style={{ resize: "both" }}
          fontSize={16}
        />

        <AceEditor
          className="editor"
          setOptions={{ useWorker: false }}
          mode="javascript"
          theme="twilight"
          onChange={(newCode) => setJsCode(newCode)}
          value={jsCode}
          name="js-code"
          editorProps={{ $blockScrolling: true }}
          style={{ resize: "both" }}
          fontSize={16}
        />
      </div>

      <button 
      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      onClick={run}>Run</button>
      <br />
      <input
      className="block mb-2 text-m font-medium text-gray-900 white:text-white"
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      {/* <button  onClick={saveProject} >save code</button>   */}
      <button  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={saveProject}>
        {isLoading ? (
          <Spinner animation="border" variant="success" size="sm" />
        ) : (
          "Save code"
        )}
      </button>

      

      <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={clearAll}>Clear all</button>
      <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={clearScreen}>Clear screen</button>
      <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={openFullscreen}>Full Screen</button>

      <div className="output">
        <iframe id="output" title="Output"></iframe>
      </div>
      </div>
  );
}

export default Home;
