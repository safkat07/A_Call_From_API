//creating the main api funtion
const handleApi = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const tabContainer = document.getElementById("tab-container");

  const apiData = data.data;
  //   console.log(apiData);
  apiData.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
  <div class="tabs  tabs-boxed">      
  <a  id="tab-button" onclick="handleLoadContent('${category.category_id}')" class="tab text-black hover:bg-red-600 hover:text-white">${category.category}</a>          
  </div>

    `;
    tabContainer.appendChild(div);
  });
};

const handleLoadContent = async (categoryID) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
  );
  const data = await response.json();
  // console.log(data.data);
  const videoData = data.data;
  view = videoData;
  sortingVideoData(videoData);
};
  const sortingVideoData = (videoData) => {
    const cardContainer = document.getElementById("card-container");
    const emptyDivContainer = document.getElementById("empty-div");

    cardContainer.innerHTML = "";

    if (videoData.length == 0) {
      const emptyDiv = document.createElement("div");
      emptyDivContainer.innerHTML = "";
      emptyDiv.innerHTML = `
    <div class= "flex flex-col items-center justify-center" >
    <div>
    <img class= "  flex justify-center" src="./Icon.png" alt="">
    <p></p>
    </div>
   <div>
   <h2 class="lg:text-5xl   font-bold">
   Oops!! Sorry, There is no content here
   </h2>
   </div>
    
    </div>
    
    `;
      emptyDivContainer.appendChild(emptyDiv);
    } else {
      emptyDivContainer.innerHTML = "";
    }

    videoData.forEach((content) => {
      const div = document.createElement("div");
      const postedDate = content.others.posted_date;
      console.log(postedDate);
      const seconds = 3665; // Replace with your desired number of seconds
      const result = secondsToHoursMinutes(postedDate);
      // const finalShowHour = `${result.hours}hrs ${result.minutes} mins ago`
      const finalShowHour = `${result.hours > 0 ? result.hours + "hrs " : ""}${
        result.minutes > 0 ? result.minutes + "mins ago" : ""
      } `;
      console.log(finalShowHour);

      div.innerHTML = `
    

   <div class="grid justify-center ">
   
   <figure>
   <div class= "relative">
   
   <img  class="  w-72 mb-3  rounded-md h-44"  src=${
     content.thumbnail
   } alt="Shoes" />
   
   <div class="absolute  text-white text-xs flex bottom-0 right-0 mb-2  mr-2"> 
   <p class= "rounded-sm border-solid text-end  bg-gray-900  px-2 ">
   ${finalShowHour}
   </p>
   </div>
   </div>
   </figure>
  
    
    <div class="flex gap-2 mt-3 mb-10">
    <div class="flex ">
    <img class="w-8 h-8 rounded-full"  src=${
      content.authors[0].profile_picture
    } alt="Shoes" />
    </div>
    <div class="flex flex-col">
    <h2 class="text-xl font-bold">${content.title}</h2>
    <h2 class="">${content.authors[0].profile_name}<span>verfiy</span></h2>
    <div class="flex gap-2">
    <h2>${content.others.views} views</h2>
    <p>${
      content.authors[0].verified
        ? '<img class="w-4 mt-1.5" src="./fi_10629607.jpg" alt="">'
        : ""
    } 
    </p>
    </div>
    
    </div>
    </div>
   </div>
    `;

      cardContainer.appendChild(div);
    });
  };


//callling the main api funciton
const sortByView = () => {
  const dataSort = view.sort((a, b) => {
    const item1 = a.others.views.split("");
    item1.pop();
    const number1 = item1.join("");
    const item2 = b.others.views.split("");
    item2.pop();
    const number2 = item2.join("");
    return number2 - number1;
  });
  sortingVideoData(dataSort);
};
handleApi();
handleLoadContent("1000");

//seconds to hour
function secondsToHoursMinutes(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return {
    hours: hours,
    minutes: minutes,
  };
}
