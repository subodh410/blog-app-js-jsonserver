// when document is loaded 
$(document).ready(function () {

    $.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            var check = false;
            return this.optional(element) || regexp.test(value);
        },
        "Please check your input."
    );

    $('#registrationBack').click(() => {
        // uses window history function to traceback 
        window.history.back();
    })

    // validation will apply for element having class =form
    $(".form").validate({
        rules: {
            // type must be email
            email: {
                required: true,
                email: true,
            },
            // minimum length must be 6 char
            username: {
                required: true,
                minlength: 4,
            },

            // minimum length must be 8 char
            password: {
                required: true,
                minlength: 8,
                regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
            },

            //length must be 10 char
            number: {
                required: true,
                minlength: 10,
                maxlength: 10,
                regex: /[789][0-9]{9}/
            },
            //pawssword length must be 8 and same as above
            confirmPass: {
                required: true,
                minlength: 6,
                equalTo: "#password",

            },
        },

        //error messages if validation fails
        messages: {
            //error message for email
            email: "Please enter a valid email address",

            //error message for username
            username: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 6 characters",
            },

            //error message for for mobile number
            number: {
                required: "Please enter a phone number",
                minlength: "Your phone must consist of 10 number",
                maxlength: "Your phone must consist of 10 number",
                regex: "please enter valid number "
            },
            //error message for for password
            password: {
                required: "Please provide a password",
                error: "must contain 1small,1 capital,1 digit & legth 8",
            },
            //error message for confirm password
            confirmPass: {
                required: "Please provide a password",
                equalTo: "Please enter the same password as above",
            },
        },
    });




    $("#registeruser").click(function (event) {
        event.preventDefault();

        var username1 = $("#username").val();
        var userpass1 = $("#password").val();
        var useremail1 = $("#email").val();
        var name1 = $("#name").val();
        var mobile1 = $("#number").val();

        var user = {
            "username": username1,
            "useremail": useremail1,
            "userpass": userpass1,
            "name": name1,
            "mobilenumber": mobile1
        };

        // console.log(username);
  

        $.ajax({
            method: "POST",
            url: "http://localhost:3000/users",
            data: JSON.stringify(user),
            dataType: "text",
            contentType: "application/json",
            success: data => console.log(data)

        }).done(() => {
            window.location.replace("../homepage/html/home.html");
        });

    });

});