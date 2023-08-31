
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
  <a onclick="handleLoadContent('${category.category_id}')" class="tab text-black  ">${category.category}</a>          
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
  cardContainer.innerHTML = "";
  data.data.forEach((content) => {
    const div = document.createElement("div");
    div.innerHTML = `
    

  <figure><img class="w-72 mb-3 rounded-md h-44"  src=${content.thumbnail} alt="Shoes" /></figure>
  
    
    <div class="flex gap-2 mt-5 mb-10">
    <div class="flex ">
    <img class="w-8 h-8 rounded-full"  src=${content.authors[0].profile_picture} alt="Shoes" />
    </div>
    <div class="flex flex-col">
    <h2 class="text-xl font-bold">${content.title}</h2>
    <h2 class="">${content.authors[0].profile_name}<span>verfiy</span></h2>
    <div class="flex gap-2">
    <h2>${content.others.views} views</h2>
    <p>${content.authors[0].verified? '<img class="w-4 mt-1.5" src="./fi_10629607.jpg" alt="">' : ''} 
    </p>
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
