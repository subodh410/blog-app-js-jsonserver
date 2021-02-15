const container = document.querySelector("#blogs_container");

const searchForm = document.querySelector(".search");

const renderPost = async (term) => {


  if (sessionStorage.getItem("user") != null && sessionStorage.getItem("user") != undefined) {
    

    let uri = "http://localhost:3000/blogs?";


    if (term) {
      uri += `&q=${term}`
    }

    const res = await fetch(uri);

    const blogs = await res.json();

    let template = "";
    blogs.forEach(blog => {



      template += `
      <div class="column col mb-4">
      <div class="imgsetting d-block m-auto">
        <img src="${blog.blogimg}" alt="...">
          <h5>${blog.blogtitle}</h5>
          <p><small>${blog.likecount} likes</small></p>

          <p>${blog.blogcontents.slice(0, 150).concat("...")}</p>
  
          <button class="btn"><a href=../../details/details.html?id=${blog.id}>read more....</a></button>
    
         
      </div>
      

      </div>
          
          
          
          `;

    });
    container.innerHTML = template;


    const nav = document.querySelector("nav");
    nav.innerHTML = `
    <nav class="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
    <div class="container">
      <img src="../../images/logo.png" height="70px" width="70px">
      <a href="" class="navbar-brand brand text-warning font-weight-bold"
        >Blog It</a
      >
      <button
        class="navbar-toggle"
        type="button"
        data-toggle="collapse"
        data-target="#collapsenavbar"
      >
        <span class="navbar-toggle-icon">
          <i class="material-icons" style="font-size:30px;color:white">menu</i>
        </span>
      </button>

      <div class="collapse navbar-collapse text-center" id="collapsenavbar">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="../../profile/profile.html" class="nav-link text-white">Profile</a>
          </li>

          <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle text-white"
            data-toggle="dropdown"
            href="#"
            >CATEGORIES<span class="caret"></span
          ></a>
          <ul class="dropdown-menu">
          <li><a href="#" id="technolgy">Technology</a></li>
          <li><a href="#" id="food">Food</a></li>
          <li><a href="#" id="art">Art</a></li>
          <li><a href="#" id="fashion">Fashion</a></li>
          <li><a href="#" id="music">Music</a></li>
          <li><a href="#" id="lifestyle">Lifestyle</a></li>
          <li><a href="#" id="fitness">Fitness</a></li>
          <li><a href="#" id="sports">Sports</a></li>
          <li><a href="#" id="travel">Travel</a></li>
          <li><a href="#" id="finance">Finance</a></li>
          <li><a href="#" id="business">Business</a></li>
          </ul>
        </li>
      
         
          <li class="nav-item">
            <a href="#" onclick="logout_user()" class="nav-link text-white">Log Out</a>
          </li>
        
        </ul>
      </div>
    </div>
  </nav>
    
    
    `;

    const blogBtn = document.querySelector("#btn-x");
    blogBtn.innerHTML = `<a href="../../createblog/CreateBlog.html" class="nav-link text-white"
    >CREATE BLOG</a>`;

    $(".dropdown-menu li a").click(blogcategory);
  }
  else {

    let uri = "http://localhost:3000/blogs?";


    if (term) {
      uri += `&q=${term}`
    }

    const res = await fetch(uri);

    const blogs = await res.json();

    let template = "";
    blogs.forEach(blog => {


     
      template += `
      <div class="column col mb-4">
      <div class="imgsetting d-block m-auto">
        <img src="${blog.blogimg}" alt="...">
          <h5>${blog.blogtitle}</h5>
          <p><small>${blog.likecount} likes</small></p>

          <p>${blog.blogcontents.slice(0, 150).concat("...")}</p>
          
          <button class="btn"><a href="../../login/login.html">read more....</a></button>
          </div>

        </div>
      </div>
      

      </div>
          
          
          
          `;

    });
    container.innerHTML = template;

    $(".dropdown-menu li a").click(blogcategory);
  }



}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderPost(searchForm.term.value.trim());
})



async function blogcategory() {
  event.preventDefault();
  var cat = $(this).attr("id");



  const res = await fetch("http://localhost:3000/blogs?blogcategory=" + cat);

  const blogs3 = await res.json();
  let template4 = "";
  blogs3.forEach(blog => {



    template4 += `
    <div class="column col mb-4">
      <div class="imgsetting d-block m-auto">
      <img src="${blog.blogimg}" alt="...">
      

        <h5>${blog.blogtitle}</h5>
        <p><small>${blog.likecount} likes</small></p>

        <p>${blog.blogcontents.slice(0, 150).concat("...")}</p>
        
        <button class="btn"><a href="../../login/login.html">read more....</a></button>
    

      </div>
    </div>
    

  
          
          
          
          `;

  });
  container.innerHTML = template4;

}
window.addEventListener("DOMContentLoaded", () => renderPost());

function logout_user() {
  sessionStorage.removeItem("user");
  window.location.replace("../html/home.html");
  location.reload();
}



$(".dropdown-menu li a").click(function () {
  event.preventDefault();
  var cat = $(this).attr("id");
 



});





window.addEventListener("DOMContentLoaded", () => renderPost());




function logout_user() {
  sessionStorage.removeItem("user");
  window.location.replace("../html/home.html");
  location.reload();
}

