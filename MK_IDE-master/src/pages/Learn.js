import React, { useState, useEffect } from 'react'
 



function DisplayAccordion() {
  const [accordionData, setAccordionData] = useState([])

  useEffect(() => {
    fetch('/get-accordion')
      .then(response => response.json())
      .then(data => setAccordionData(data))
    
      .catch(error => console.error(error))
    
  }, [])

  return (

      
    



    <div className ="w-screen h-screen flex flex-col items-center justify-center">
      
      <div className ="w-full max-w-md">
        {accordionData.map((accordion, index) => (
          <div key={index} className="mb-4 border border-gray-300 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">{accordion.title}</h2>
            <ul className="list-disc pl-6">
              {accordion.items.map((item, index) => (
               <a href={`learn/${item._id}`} key={`accordion-${index}`}> <li key={index}>{item.topictitle} <button>start</button></li></a>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DisplayAccordion
