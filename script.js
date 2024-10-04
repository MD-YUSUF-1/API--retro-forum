// LatestPosts: - https://openapi.programming-hero.com/api/retro-forum/latest-posts



const loadPosts =async( searchText)=> {

    // console.log(`https://openapi.programming-hero.com/api/retro-forum/posts${ searchText? `?category=${searchText}`:""}`)


    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${searchText?`?category=${searchText}` : ""}`)
    const data = await response.json();
    display(data.posts);
}  


const display =(data)=> {
    const postContainer = document.getElementById("post-container");
    data.forEach(e => {
        const div = document.createElement('div');
        div.innerHTML=`
        <div class="p-6 lg:p-12 flex flex-col lg:flex-row gap-6 items-center lg:items-start rounded-3xl bg-[#F3F3F5]">
            <div class="indicator">
              <span class="indecator-item badge ${e.isActive ? " bg-green-600" : "bg-red-500" }"></span>
              <div class="avatar">
                <div class="w-24 rounded-xl">
                  <img src="${e.image}" alt="">
                </div>
              </div>
            </div>
            <div class="space-y-4 w-full">
              <div class="flex gap-4 *:opacity-60">
                <p>${e?.category}</p>
                <p>Author: ${e?.author?.name}</p>
              </div>
              <h3 class="text-2xl font-bold opacity-70">
                ${e?.title}
              </h3>
              <p class="opacity-40">${e.description}</p>
              <hr class="border border-dashed border-gray-300">
              <div class="flex justify-between *:font-bold [&>*:not(:last-child)]:opacity-45">
                <div class="flex gap-4">
                  <div class="space-x-2 flex items-center">
                    <i class="fa-regular fa-comment-dots"></i>
                    <p>${e.comment_count}</p>
                  </div>
                  <div class="space-x-2 flex items-center">
                    <i class="fa-regular fa-eye"></i>
                    <p>${e.view_count}</p>
                  </div>
                  <div class="space-x-2 flex items-center">
                    <i class="fa-regular fa-clock"></i>
                    <p>${e.posted_time}</p>
                  </div>
                </div>
                <div class="opacity-100">
                  <button id="add-to-list" class="add-to-list btn btn-circle btn-sm bg-green-500" onclick = "markAsRead('${e.description}', '${e.view_count}')" >
                    <i class="fa-solid fa-envelope-open text-white"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `

        postContainer.appendChild(div);
    });
}


const markAsRead = ( description , view_count)=>{
    const markAsReadContainer = document.getElementById("markAsReadContainer");
    const div = document .createElement('div');
    div.innerHTML=`
    <div class="flex justify-between p-2 lg:p-3 rounded-2xl gap-3 bg-white items-center">
    <div class="lg:w-4/5 w-11/12">
    <p>${description}</p>
    </div>
    <div class="space-x-2 flex items-center">
                    <i class="fa-regular fa-eye"></i>
                    <p>${view_count}</p>
                  </div>
    </div>
    `
    markAsReadContainer.appendChild(div);

    handleCount();
}

const handleCount=()=>{
    const prevCount = document.getElementById("markAsReadCounter").innerText;
    const convertedCount = parseInt(prevCount);
    const sum = convertedCount+1;
    document.getElementById('markAsReadCounter').innerText = sum;
}
const handleSearchByCategory= () =>{
    const searchText = document.getElementById("searchPosts").value;
    loadPosts(searchText);
} 


loadPosts();