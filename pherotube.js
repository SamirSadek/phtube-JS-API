let selectedID = null;
const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const category = data.data;

  const menuContainer = document.getElementById("menu-container");
  category.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick=loadCardContainer('${category.category_id}'); id='${category.category_id}' class="btn active px-8 bg-[#25252533] text-[#252525] hover:bg-[#FF1F3D] hover:text-white">
                ${category.category}
              </button>
        `;
    menuContainer.appendChild(div);
  });
};

const loadCardContainer = async (categoryID) => {
  selectedID= categoryID;
  console.log('select',selectedID);
  const cardContainerId = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
  );
  const data = await cardContainerId.json();
  console.log(data.status);
  const cardContainerDetails = data.data;
  const cardContainer = document.getElementById("card-container");
  const noDataShow = document.getElementById("no-data-show");
  cardContainer.innerHTML = "";
  noDataShow.innerHTML = "";
 
 
  if (data.status === true) {
    showCard(cardContainerDetails);
   
    
  } else {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="flex flex-col items-center my-20" >  
    <img class="text-center"  src="./images/icon.png" alt="">
    <p class="text-4xl font-bold text-center">Oops!! Sorry, There is no <br> content here</p>
    </div>
    `;
    noDataShow.appendChild(div);
  }
};

const sortByView=async()=>{
  const cardContainerId = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${selectedID}`
  );
  const data = await cardContainerId.json();
  const data2 = data.data;
  // console.log(data2);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  data2.forEach((news) => {
   
  const viewsTotal = news.others.views;
  const viewsTotal1 = parseFloat(viewsTotal.replace('K',''));
  news.views = viewsTotal1;

  });
  data2.sort((a, b) => b.views - a.views);
  console.log(data2);
  if(data.status==true){showCard(data2);}
  
};

const showCard = (cards)=>{

  const cardContainer = document.getElementById("card-container");
  const noDataShow = document.getElementById("no-data-show");
  cardContainer.innerHTML = "";
  noDataShow.innerHTML = "";
  cards.forEach((news) => {
    // time conversion

    const div = document.createElement("div");
    const timeInSec = news.others.posted_date;
    const hours = Math.floor(timeInSec / 3600);
    const minutes = Math.floor((timeInSec % 3600) / 60);
    const convertedTime = `${hours}hrs ${minutes}min ago`;
    
    div.innerHTML = `
      <div class="card mb-9 ">
      <div class="relative">
        <img src="${news.thumbnail}" alt="" class="w-full h-48 rounded-lg" />
        ${
          hours
            ? `<p class="absolute bottom-2 right-2 bg-[#171717] text-white px-2 py-1  rounded text-xs">${convertedTime}</p>
        `
            : ""
        }
        </div>

      <div class="card-footer flex justify-between mt-8">
        <div class="flex gap-4">
          <div>
            <div class="avatar">
              <div class="w-14 rounded-full">
                <img src="${news.authors[0].profile_picture}"/>
              </div>
            </div>
          </div>
          <div>
            <h2 class="text-base font-bold">${news.title}</h2>
            <p id="verified" class="flex align-center  gap-2 my-3 text-[#171717B2] text-sm">${
              news.authors[0].profile_name
            } ${
      news.authors[0].verified
        ? `<img class="w-5 h-5" src="./images/verified.png" alt="" srcset=""/>`
        : ""
    }</p>
            <p class="text-[#171717B2] text-sm">${news.others.views} views</p>
          </div>
        </div>
      </div>
    </div>
      `;
    cardContainer.appendChild(div);     
  });
}


handleCategory();
loadCardContainer(1000);




