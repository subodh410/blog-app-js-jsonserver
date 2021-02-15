const blog_container = document.querySelector(".blogarea");
const comment_container = document.querySelector(".commentarea");
const like_container = document.querySelector(".likearea");
const ac = document.querySelector(".addcomment");
const id = new URLSearchParams(window.location.search).get("id");


const x = sessionStorage.getItem("user");



var blog;
var comment;
var like;
var flag = 0;

const renderDetails = async () => {


    const res = await fetch("http://localhost:3000/blogs/" + id);

    blog = await res.json();

    

    const template = `
    <div class="d_blog">  
    <div class='blogTitle'>${blog.blogtitle}</div>
    <div class="blogAuther">By <em>${blog.username}</em> </div>
    <div class='blogCat'>${blog.blogcategory}</div><br><br>
    <div class='blogImage'><img src="'../../../'+${blog.blogimg}" class="mx-auto d-block"></div><br><br>
    <div class='blogContents'>${blog.blogcontents}</div>
    </div>
   
    `;

    blog_container.innerHTML = template;


    if (sessionStorage.getItem(`blog-${blog.id}`) == 1) {
        likeBtn.style.visibility = "hidden";
    }

    const res2 = await fetch(`http://localhost:3000/comments?blogid=${blog.id}`);
    comment = await res2.json();

    var template1 = "";
    comment.forEach((element) => {
        template1 += `   
        <div class="col-md-8 d_comment container ">
        <div class="media g-mb-30 media-comment">
            <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
              <div class="g-mb-15">
                <h5 class="h5 g-color-gray-dark-v1 mb-0 uname"> ${element.commentby}</h5>
              </div>
              <p class="comment">${element.commentcontent}</p>
            </div>
        </div>
    </div>
          `;
    });

    var d = document.createElement("div");
    d.className='row';
    d.innerHTML = template1;
    comment_container.append(d);

    const res3 = await fetch(`http://localhost:3000/likes?blogid=${blog.id}`);
    like = await res3.json();
   


    var inc = 0;
    var template2 = "";
   



    like.forEach((element) => {

        template2 += `
       <li>${element.username}</li> 
         `;


    });

    let template3 = `<div class="d_like">
    <!--<label id='like_user'></label>-->
  <div class="like_count">${like.length} likes</div>

<!--  <div class="like_by">likeby:${template2}</div>-->

  
  </div>`;

    var d2 = document.createElement("div");
    d2.innerHTML = template3;
    like_container.append(d2);
};

const addlike = async (e) => {
    e.preventDefault();

    flag = 1;

    sessionStorage.setItem(`blog-${blog.id}`, flag);

debugger
    const doc3 = {
        blogid: blog.id,
        username: x,
    };


    var flag2 = 1;

    for (var i = 0; i < like.length; i++) {
        if (like[i].username != x) {
            flag2 = 1;

        }
        else {
            flag2 = 0;
        }

    }
    if (flag2 == 1) {
        await fetch(`http://localhost:3000/likes`, {
            method: "POST",
            body: JSON.stringify(doc3),
            headers: { "Content-Type": "application/json" },
        });
    }

  ;


};

const addcomment = async (e) => {
    e.preventDefault();

    const doc = {
        blogid: blog.id,
        commentby: x,
        commentcontent: document.querySelector("textarea").value,
    };

    await fetch("http://localhost:3000/comments", {
        method: "POST",
        body: JSON.stringify(doc),
        headers: { "Content-Type": "application/json" },
    });
};

window.addEventListener("DOMContentLoaded", () => renderDetails());
var adtodbBtn = document.querySelector("#addc");
adtodbBtn.addEventListener("click", addcomment);

var likeBtn = document.querySelector("#likeme");
likeBtn.addEventListener("click", addlike);



