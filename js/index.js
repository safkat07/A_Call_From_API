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
    tabContainer.appendChild(div)
  });
};

const handleLoadContent = async (categoryID) => {
const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`)
const data = await response.json()
console.log(data.data);
const cardContainer = document.getElementById('card-container')
cardContainer.innerHTML=''
data.data.forEach((content) =>{
    const div = document.createElement('div')
    div.innerHTML = `
    
    <div class="card card-compact w-72 h-72 my-5 bg-base-100 shadow-xl">
  <figure><img  src=${content.thumbnail} alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    
    `;

    cardContainer.appendChild(div)
})






};


//callling the main api funciton
handleApi();
handleLoadContent("1000")

