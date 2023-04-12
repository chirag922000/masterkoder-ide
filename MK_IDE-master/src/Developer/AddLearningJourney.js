import React, { useState } from 'react';
import axios from 'axios';

const NewAccordionItem = () => {
  const [title, setTitle] = useState('');
  const [topics, setTopics] = useState([]);

  const handleTopicChange = (index, field, value) => {
    const newTopics = [...topics];
    newTopics[index][field] = value;
    setTopics(newTopics);
  };

  const handleAddTopic = () => {
    setTopics([...topics, { topictitle: '', content: [] }]);
  };

  const handleRemoveTopic = (index) => {
    const newTopics = [...topics];
    newTopics.splice(index, 1);
    setTopics(newTopics);
  };

  const handleContentChange = (topicIndex, contentIndex, field, value) => {
    const newTopics = [...topics];
    newTopics[topicIndex].content[contentIndex][field] = value;
    setTopics(newTopics);
  };

  const handleAddContent = (topicIndex) => {
    const newTopics = [...topics];
    newTopics[topicIndex].content.push({ contentimg: '', contenttext: '',contentvideo:"" });
    setTopics(newTopics);
  };

  const handleRemoveContent = (topicIndex, contentIndex) => {
    const newTopics = [...topics];
    newTopics[topicIndex].content.splice(contentIndex, 1);
    setTopics(newTopics);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/add-accordion', {
        title,
        items: topics,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
       <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">  Title:</label>
    <input type="text" id="default-input" value={title} onChange={(event) => setTitle(event.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
       
         
 
     
      {topics.map((topic, topicIndex) => (
        <div key={topicIndex}>
           <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">  Topic Title:</label>
          
          
            <input
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              value={topic.topictitle}
              onChange={(event) => handleTopicChange(topicIndex, 'topictitle', event.target.value)}
            />
          
          {topic.content.map((content, contentIndex) => (
            <div key={`${topicIndex}-${contentIndex}`}>
               <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">    Content Image:</label>
             
                <input
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  value={content.contentimg}
                  onChange={(event) =>
                    handleContentChange(topicIndex, contentIndex, 'contentimg', event.target.value)
                  }
                />
             
             <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">    Content Text:</label>
          
                <textarea
                id="editor" rows="8" className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="content Text"
                  value={content.contenttext}
                  onChange={(event) =>
                    handleContentChange(topicIndex, contentIndex, 'contenttext', event.target.value)
                  }
                />
                

                <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">    Content Video:</label>
          
          
          <input
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  value={content.contentvideo}
                  onChange={(event) =>
                    handleContentChange(topicIndex, contentIndex, 'contentvideo', event.target.value)
                  }
                />

 
                
              
            </div>
          ))}

 
          <button 
         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
           type="button" onClick={() => handleAddContent(topicIndex)}>
            Add Content
          </button>


          <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
          type="button" onClick={() => handleRemoveContent(topicIndex)}>
            Remove Content
          </button>


        </div>
      ))}

 
      <button
      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" 
      type="button" onClick={handleAddTopic}>
        Add Topic
      </button>
      
      <button
      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" 
      type="button" onClick={handleRemoveTopic}>
        Remove Topic
      </button>
      
      <button
      className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
       type="submit">Save
       </button>
       
    </form>
  );
};

export default NewAccordionItem;







 
