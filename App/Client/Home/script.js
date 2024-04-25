import { UTCookies } from "../Assets/Utile/UTCookies.js";

$(document).ready(function () {

  Init();

  function Init() {
    console.log('999');
    getUserInfo();
    logOut();
  }

  // ----------------


  function logOut(){
    $('#logOut').click(function(){
        window.location.replace("../Login");
    })
  }

  function getUserInfo(){

    let userId = UTCookies.getCookie('userId');
    console.log('>>>cookies : '+ userId);

    $.ajax({
      type: "post",
      url: "/Assignment/Kasekam/App/Server/User/retrieveUserForHomePage.php",
      data: {
        userId: userId
      },
      dataType: "json",
      success: function (data) {

        $('#userProfile').attr({'src': data.profile});
      },
    });
  }


  function postData() {

    let cookies = UTCookies.getCookie('userId');
    console.log('>>>cookies : '+ cookies);


  }
});
