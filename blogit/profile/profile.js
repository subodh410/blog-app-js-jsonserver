// const id = new URLSearchParams(window.location.search).get("id");


const profile = document.querySelector(".profile");

const blogcontainer = document.querySelector(".blogs");

const user_name = sessionStorage.getItem("user");

// const deleteBtn = document.querySelector(".dBtn");

const renderDetails = async () => {
  const res = await fetch("http://localhost:3000/users?username=" + user_name);

  const user = await res.json();




  const template = `
    <h2>Welcome ${user[0].name}</h2>
    <p><span class="p-span">Username : </span>${user[0].username}</p>
    <p><span class="p-span">Email : </span>${user[0].useremail}</p>
    <p><span class="p-span">Mobile No : </span>${user[0].mobilenumber}</p>
    `;

  profile.innerHTML = template;

  const res2 = await fetch("http://localhost:3000/blogs?username=" + user_name);


  var template2 = "";
  const blog11 = await res2.json();
 

  if (blog11.length == 0) {
    template2 = "You didnt add any blogs";
  }
  else {


    blog11.forEach((element) => {

      template2 += `
      <div class="column col mb-4">
      <h5>${element.blogtitle}</h5>
      <div class="imgsetting d-block m-auto">
        <img src="'/../../'${element.blogimg}" alt="...">
          
          <p><small>${element.likecount} likes</small></p>

          <p>${element.blogcontents.slice(0, 150).concat("...")}</p>
          <button class="btn btn-primary"><a href="../details/details.html?id=${element.id}">read more.... </a></button>
          <button class="btn btn-primary" onclick=deleteblog("${element.id}")>delete</button>
          </div>

        </div>
      </div>
      `;



    });

  }

  blogcontainer.innerHTML = template2;
};

async function deleteblog(id) {


  const alllike = await fetch(`http://localhost:3000/likes?blogid=${id}&username=${user_name}`);
  var like22 = [] = await alllike.json();

  const allcomment = await fetch(`http://localhost:3000/comments?blogid=${id}&commentedby=${user_name}`);
  var comment22 = [] = await allcomment.json();







  const res = await fetch("http://localhost:3000/blogs/" + id, {
    method: "DELETE",
  });


  like22.forEach(async element => {
    const res = await fetch("http://localhost:3000/likes/" + element.id, {
      method: "DELETE",
    });

  });
  comment22.forEach(async element => {
    const res = await fetch("http://localhost:3000/likes/" + element.id, {
      method: "DELETE",
    });

  });





}


window.addEventListener("DOMContentLoaded", () => renderDetails());
