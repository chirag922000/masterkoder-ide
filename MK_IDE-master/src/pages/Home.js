 
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight";
import "./home.css"

// import { useLocation } from 'react-router-dom';
 



function Home( ) {
  
 
  const [htmlCode, setHtmlCode] = useState(""); 
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [projectName, setProjectName] = useState("");
  const { id } = useParams();
 

  useEffect(( )=>{
  //  verifyUser()
     
    if(id){
       
      const getProducts = async () => {
        try{
          
          let result = await fetch(`/fiddles/${id}`, {
            headers: {
              'Content-Type': 'application/json',
               
            },
             
        });
        result = await result.json();
      
        
          
        const project = result.projects.find(p => p._id.toString() === id);
        if(!project){
          const allprojects= result.allprojects.find(p => p._id.toString() === id);
          setHtmlCode(allprojects.html)
        setCssCode(allprojects.css)
        setJsCode(allprojects.js)
        setProjectName(allprojects.name)
        }else{

          setHtmlCode(project.html)
          setCssCode(project.css)
          setJsCode(project.js)
          setProjectName(project.name)
        }
         
       
      }catch (error) {
          console.log(error);
        }
        
      };
      getProducts()
    }
    
  },[id])

  
const clearScreen=()=>{
  const iframe = document.querySelector("#output");
  iframe.setAttribute("src", "");
  iframe.contentDocument.body.innerHTML = "";
}

  const saveProject = async () => {
    
    if(!projectName || (!htmlCode && !cssCode && !jsCode)){
      alert("please write project name and some code to save project")
    } else{
    try {
       
       
      const response = await fetch(' /save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({
           
          name: projectName,
          html: htmlCode,
          css: cssCode,
          js: jsCode,
        }),
      });
      
      const data = await response.json();
       if(response.ok){
        alert("project saved")
       }
     return data
    } catch (error) {
      console.log(error);
     
       
    }
  }
  };
const openFullscreen=()=>{
  const iframe = document.querySelector("#output");
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  }
}
  


 const run = () => {
 
    try{
    const iframe = document.querySelector("#output");
    // const sanitizedHtml = DOMPurify.sanitize(htmlCode);
    iframe.contentDocument.body.innerHTML =
    htmlCode + "<style>" + cssCode + "</style>";

   

    iframe.contentWindow.eval(jsCode);
   
   } catch(error){
    console.log(error)
    alert("syntax error")
  }
    
}

const clearAll=()=>{
  setHtmlCode("")
  setCssCode("")
  setJsCode("")
  const iframe = document.querySelector("#output");
  iframe.setAttribute("src", "");
  iframe.contentDocument.body.innerHTML = "";
}

  return (<>
    <div className="container">
 
    
      <AceEditor
        setOptions={{ useWorker: false }}
        mode="html"
        theme="twilight"
        onChange={(newCode) => setHtmlCode(newCode)}
        value={htmlCode}
        name="html-code"
        editorProps={{ $blockScrolling: true }}
        style={{resize: "both"}}
        fontSize={16}
      />

      <AceEditor
       setOptions={{ useWorker: false }}
        mode="css"
        theme="twilight"
        onChange={(newCode) => setCssCode(newCode)}
        value={cssCode}
        name="css-code"
        editorProps={{ $blockScrolling: true }}
        style={{resize: "both"}}
        fontSize={16}
      />

      <AceEditor
       setOptions={{ useWorker: false }}
        mode="javascript"
        theme="twilight"
        onChange={(newCode) => setJsCode(newCode)}
        value={jsCode}
        name="js-code"
        editorProps={{ $blockScrolling: true }}
        style={{resize: "both"}}
        fontSize={16}
      />
      </div>

      <button  onClick={run}>Run</button><br/>
      <input type="text" placeholder="Project Name" value={projectName} onChange={e => setProjectName(e.target.value)} />
      <button  onClick={saveProject} >save code</button>  
    <button onClick={clearAll}>Clear all</button>
    <button onClick={clearScreen}>Clear screen</button>
    <button onClick={openFullscreen}>Full Screen</button>

      <div className="output">
    <iframe id="output" title="Output"></iframe>
     </div>
    
    </>);
}

export default Home;
