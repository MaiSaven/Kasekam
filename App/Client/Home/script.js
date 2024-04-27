import { UTCookies } from "../Assets/Utile/UTCookies.js";

$(document).ready(function () {

  Init();

  function Init() {
    UTCookies.checkCookie();
    getUserInfo();
    searchProduct();
    logOut();
  }

  // ----------------


  function logOut(){
    $('#logOut').click(function(){
        window.location.replace("../Login");
    })
  }

  //-----------------
  // Get User Info for profile

  function getUserInfo(){

    let userId = UTCookies.getCookie('userId');
    console.log('>>>cookies : '+ userId);

    $.ajax({
      type: "post",
      url: "/Assignment2/Kasekam/App/Server/User/retrieveUserForHomePage.php",
      data: {
        userId: userId
      },
      dataType: "json",
      success: function (data) {

        $('#userProfile').attr({'src': data.profile});
      },
    });
  }

  // function postData() {
  //   let cookies = UTCookies.getCookie('userId');
  //   console.log('>>>cookies : '+ cookies);
  // }

  //----------------
  // Search Product

  function searchProduct(){
    $('.inp_search_info').on('input', function() {

      var searchQuery = $(this).val();
      
      // var url = '../Product/?search=' + searchQuery;
      var url = '../Product/?search=' + encodeURIComponent(searchQuery);

      console.log(url);
      
      $('#product').attr('src', url);
    });

  }



});
