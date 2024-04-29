import { UTCookies } from "../Assets/Utile/UTCookies.js";
import { UTImage } from "../Assets/Utile/UTImage.js";
import { UTResponse } from "../Assets/Utile/UTResponse.js";

$(document).ready(function () {
  var pageNo = 1;

  Init();

  function Init() {
    signIn();
  }

  // ----------------

  function signIn() {
    $("#signIn").click(function () {
      postData();
    });
  }

  function postData() {
    const email = $("#email");
    const password = $("#password");

    console.log(email.val());
    console.log(password.val());

    $.ajax({
      type: "post",
      url: "/Kasekam/App/Server/User/retrieveUserForLogin.php",
      data: {
        email: email.val(),
        password: password.val(),
      },
      dataType: "json",
      success: function (data) {
        UTCookies.setCookie("userId", data.userId, 30);

        let cookies = UTCookies.getCookie('userId');

        console.log('>>>cookies : '+ cookies);

        if (data.strError == "00") {
          console.log("Ok>>>" + data.strError);
          window.location.replace("../Home/index.html");
        } else {
          alert(data.msg + " " + data.strError);
          console.log("Ok>>>" + data.msg + " : " + data.strError);
        }
      },
    });
  }
});
