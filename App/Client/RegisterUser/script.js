import { UTImage } from "../Assets/Utile/UTImage.js";
import { UTResponse } from "../Assets/Utile/UTResponse.js";

$(document).ready(function () {
  var pageNo = 1;

  Init();

  function Init() {
    back();
    next();
    uploadImageProfile();
    uploadImageCover();
    // console.log(pageNo);
    submit();
  }

  //---------------

  function back() {
    $("#btnBack").click(function () {

      if (pageNo > 1) {

        var current = ".info_" + pageNo;
        pageNo -= 1;
        var back = ".info_" + pageNo;

        console.log(pageNo);

        $(current).css({ display: "none" }); // .info_2
        $(back).css({ display: "block" }); // .info_1
      }
      

      if(pageNo < 4){
        $('#btnNext').css('display','block');
        $('#btnSubmit').css('display','none');
      }

    });
  }
  function next() {
    $("#btnNext").click(function () {
      if (pageNo < 4) {
        var current = ".info_" + pageNo;
        pageNo += 1;
        var next = ".info_" + pageNo;

        console.log(pageNo);

        $(current).css({ display: "none" }); // .info_1
        $(next).css({ display: "block" }); // .info_2
      }
      if(pageNo == 4 ){
        $('#btnNext').css('display','none');
        $('#btnSubmit').css('display','block');
        
      }
    });
  }

  function uploadImageProfile() {
    const btnInput = $("#uploadFileImgProfile");
    const imgDisplay = $("#imgProfile");

    UTImage.setImage(btnInput, imgDisplay, function () {
      $("#upload_img_profile").css({ display: "block" });
    });
  }

  function uploadImageCover() {
    const btnInput = $("#uploadFileImgCover");
    const imgDisplay = $("#imgCover");

    UTImage.setImage(btnInput, imgDisplay, function () {
      $("#upload_img_cover").css({ display: "block" });
    });
  }

  function submit(){
    $('#btnSubmit').click(function(){
      postData();
    })
  }


  // ----------------

  function postData(){
    const firstName   = $('#firstName');
    const lastName    = $('#lastName');
    const gender      = $('#gender');
    const birthday    = $('#birthday');
    const phoneNumber = $('#phoneNumber');
    const province    = $('#province');
    const district    = $('#district');
    const commune     = $('#commune');
    const location    = $('#location');
    const telegram    = $('#telegram');
    const email       = $('#email');
    const password    = $('#password');
    const imgProfile  = $('#imgProfile');
    const imgCover    = $('#imgCover');


    console.log(firstName.val()        );
    console.log(lastName.val()         );
    console.log(gender.val()           );
    console.log(birthday.val()         );
    console.log(phoneNumber.val()      );
    console.log(province.val()         );
    console.log(district.val()         );
    console.log(commune.val()          );
    console.log(location.val()         );
    console.log(telegram.val()         );
    console.log(email.val()            );
    console.log(password.val()         );
    console.log(imgProfile.attr('src') );
    console.log(imgCover.attr('src')   );


    $.ajax({
      type: 'post',
      url: '/Assignment/Kasekam/App/Server/User/registerUser.php',
      data:{
        firstName  : firstName.val(),
        lastName   : lastName.val(),
        gender     : gender.val(),
        birthday   : birthday.val(),
        phoneNumber: phoneNumber.val(),
        province   : province.val(),
        district   : district.val(),
        commune    : commune.val(),
        location   : location.val(),
        telegram   : telegram.val(),
        email      : email.val(),
        password   : password.val(),
        imgProfile : imgProfile.attr('src'),
        imgCover   : imgCover.attr('src')
      },
      dataType: 'json',
      success:function(data){

          
          console.log('Ok>>>'+data.strError);

          if(data.strError == '00'){
            alert(data.msg);
            window.location.replace("../Login/index.html");
          }else{
            alert(data.msg+" "+ data.strError);
          }
      }
    })
  }
});
