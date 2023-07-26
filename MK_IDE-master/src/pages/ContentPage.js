import React, { useEffect,   useState } from "react";
import {   useParams } from "react-router-dom";
 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./contentpage.css";

function ContentPage() {
  const { id } = useParams();
  
  const [data, setData] = useState([]);
   
 

  useEffect(() => {
    const getContentData = async () => {
      try {
        let result = await fetch(`/learn/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        result = await result.json();
         
        setData(result);

        // You can access the content object from the response and do whatever you need to do with it
      } catch (e) {
        console.log(e);
      }
    };

    getContentData();
  }, [id]);

  console.log(data)

  const newArray = data.map((item) => {
    if (item.contentimg && item.contenttext) {
      return   'image' 
    } else if (item.contentvideo) {
      return  "video"
    } else if (item.contentcode) {
      return  "code"
    }else{
      return "technical issue"
    }
  });

   
   

  
   


  function renderContent() {
    return newArray.map((content, index) => {
      if (content === "image") {
        return (
          <div className="image-div" key={index}>
            <img src={data[index].contentimg} className="contentimg" alt="Imge"/>
            <p>{data[index].contenttext}</p>
            
          </div>
        );
      } else if (content === "video") {
        return (
          <div className="video-div" key={index}>
            <iframe src={data[index].contentvideo} title="jjhv" rameborder="0" allowFullScreen crossOrigin="anonymous"></iframe>
             
          </div>
        );
      } else if (content === "code") {
        return (
          <div className="code-div" key={index}>
            <pre>
              <code>{data[index].contentcode}</code>
            </pre>
            <p>Code Content</p>
          </div>
        );
      }else if(content === "quiz"){
        return(
           <div>
            <label className="text-xl ">What is the full form of HTML? </label>
            <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div class="flex items-center pl-3">
            <input id="list-radio-license" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label for="list-radio-license" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Driver License </label>
        </div>
    </li>
    <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div class="flex items-center pl-3">
            <input id="list-radio-id" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label for="list-radio-id" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">State ID</label>
        </div>
    </li>
    <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div class="flex items-center pl-3">
            <input id="list-radio-millitary" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label for="list-radio-millitary" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">US Millitary</label>
        </div>
    </li>
    <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div class="flex items-center pl-3">
            <input id="list-radio-passport" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label for="list-radio-passport" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">US Passport</label>
        </div>
    </li>
</ul>
          </div>
        )
      }
    });
  }
  const settings = {
    dots: true,
    infinite: false,
    speed: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
     
  };

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style }} onClick={onClick}>
        <svg viewBox="0 0 18 18">
          <path
            fill="currentColor"
            d="M5.5 1.5L5.5 16.5 8.5 13.5 14.5 13.5 14.5 4.5 8.5 4.5 5.5 1.5Z"
          ></path>
        </svg>
      </div>
    );
  }
   
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style }} onClick={onClick}>
        <svg viewBox="0 0 18 18">
          <path
            fill="currentColor"
            d="M5.5 1.5L5.5 16.5 8.5 13.5 14.5 13.5 14.5 4.5 8.5 4.5 5.5 1.5Z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <>
  

 <Slider {...settings}>
 {renderContent()}
 </Slider>
  
  
 
  </>
  );
}

export default ContentPage;
