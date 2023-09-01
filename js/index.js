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
  <a  id="tab-button" onclick="handleLoadContent('${category.category_id}')" class="tab text-black ">${category.category}</a>          
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
  console.log(data.data);


  const cardContainer = document.getElementById("card-container");
  const emptyDivContainer = document.getElementById("empty-div");

  cardContainer.innerHTML = "";

  if (data.data.length == 0) {
    console.log("say array empty");
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

  data.data.forEach((content) => {
    const div = document.createElement("div");
    const postedDate = content.others.posted_date
    console.log(postedDate);const seconds = 3665; // Replace with your desired number of seconds
    const result = secondsToHoursMinutes(postedDate);
    // const finalShowHour = `${result.hours}hrs ${result.minutes} mins ago`
    const finalShowHour = `${result.hours > 0 ? result.hours + 'hrs ' : ''}${result.minutes > 0 ? result.minutes + 'mins ago' : ''} `;
    console.log(finalShowHour);
    
    div.innerHTML = `
    

   <div class="grid justify-center ">
   
   <figure class= "relative"><img  class="  w-72 mb-3  rounded-md h-44"  src=${
     content.thumbnail
   } alt="Shoes" /></figure>
   <div class="absolute  text-white text-xs flex lg:ml-40 ml-52 mt-36 lg:mt-36"> 
   <p class= " border-solid text-end  bg-gray-900  px-2 ">
   ${finalShowHour}
   </p>
   </div>
  
    
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
handleApi();
handleLoadContent("1000");
//sort by view button
const sortByView = (sortcategoryID) => {
  console.log("sort by  button");
};

// fetch data from api for second to hour
// const showHourMinute = async (hourCategoryID) => {
//   const response = await fetch(
//     ` https://openapi.programming-hero.com/api/videos/category/${hourCategoryID}`
//   );
//   const data = await response.json();
  
//   console.log(result);
// };

// showHourMinute("1000");


//seconds to hour

function secondsToHoursMinutes(seconds) {
  const hours = Math.floor(seconds / 3600); 
  const minutes = Math.floor((seconds % 3600) / 60); 

  return {
    hours: hours,
    minutes: minutes,
  };
}
