const form = document.querySelector("form");
function gettext(e) {
    e.preventDefault();
   

    const user = sessionStorage.getItem("user");
 

    const myBlog = {
        username: user,
        blogtitle: form.blogtitle.value,
        blogimg: form.img.value,
        blogcontents: tinymce.activeEditor.getContent(),
        blogcategory: form.category.value,
    };
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/blogs",
        data: JSON.stringify(myBlog),

        dataType: "text",
        contentType: "application/json",
    }).done(() => {
       

        window.location.replace("../homepage/html/home.html");
        // location.reload();
    });
}