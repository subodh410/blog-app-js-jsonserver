$(document).ready(function () {


  // if input field is in focus then apply this class so the lable goes up
  $('.input').focus(function () {
    $(this).parent().find(".label-txt").addClass('label-active');
  });

  // remove class if element is not in focuss
  $(".input").focusout(function () {
    if ($(this).val() == '') {
      $(this).parent().find(".label-txt").removeClass('label-active');
    };
  });



  $("#login_user").click((e) => {
    e.preventDefault();

    var username = $("#username").val();
    var userpass = $("#password").val();

    var testresult = [];
    $.ajax({
      url: `http://localhost:3000/users?username=${username}&userpass=${userpass}`,
      type: "GET",
      success: function (result) {
       
        testresult = result;
      },
    }).done(() => {
      if (testresult.length == 0) {
       
        $("#valid").html("you are not a valid user").css("color","red");
      }
      else {

     
        const name = testresult[0].username;
        sessionStorage.setItem("user", name);



      
   
        window.location.replace("../homepage/html/home.html");
      }
    })

  });



});

