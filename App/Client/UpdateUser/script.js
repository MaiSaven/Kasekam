import { Location } from "../Assets/ClassResources/Location.js";
import { UTCookies } from "../Assets/Utile/UTCookies.js";
import { UTImage } from "../Assets/Utile/UTImage.js";
import { UTResponse } from "../Assets/Utile/UTResponse.js";

$(document).ready(function () {

  var userId = UTCookies.getCookie('userId');
  var loca = new Location();

  Init();

  function Init() {
    UTCookies.checkCookie();
    back_onclick();
    getUserInfo();
    provinceChange();
    districtChange();
    uploadImageProfile();
    uploadImageCover();
    submit();
    showPassoword();
  }

  //---------------

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

  //-----------------------------
  // Button Back

  function back_onclick(){
    $('#btnBack').click(function(){
      window.location.replace("../Profile");
      // window.history.back();
      // window.history.go(-1);
    })
  }

  //-------------------
  // Show password

  function showPassoword(){
    $('.showPassword').click(function(){
      var type = $('#password').prop('type');

      if( type === 'password'){
        $('#password').prop('type', 'text');
      }else{
        $('#password').prop('type', 'password');
      }
    })
  }

  //------------------
  // Get User Info detail

  function getUserInfo(){
    $.ajax({
      type: 'post',
      url: '/Assignment2/Kasekam/App/Server/User/retrieveUserInfo.php',
      data:{
        UserId : userId
      },
      dataType: 'json',
      success:function(data){

        if(!data.strError){
          for (const i in data) {

            // loca.retrieveLocation('P','','province','ProvId','ProvName',function(){
            //   $('#province').val(data[i]['Province']);
            // });
            // loca.retrieveLocation('D',data[i]['Province'],'district','DistId','DistName',function(){
            //   $('#district').val(data[i]['District']);
            // });
            // loca.retrieveLocation('C',data[i]['District'],'commune','CommId','CommName',function(){
            //   $('#commune').val(data[i]['Commune']);
            // });

            setUserInfo(data[i]['First_name'], data[i]['Last_name'], data[i]['Gender'], data[i]['Birthday'], data[i]['Phone'], data[i]['Province'], data[i]['District'], data[i]['Commune'], data[i]['Location'], data[i]['Telegram'], data[i]['Email'], data[i]['Password'],data[i]['Profile'] , data[i]['Cover']);
          }
          
          
        }else{
          console.log(data.msg);
        }
      }
    })
  }

  function setUserInfo(First_name, Last_name, Gender, Birthday, Phone, Province, District, Commune, Location, Telegram, Email, Password, Profile, Cover){
    // console.log(District);
    // console.log(Commune);
    
    $('#firstName').val(First_name);
    $('#lastName').val(Last_name);
    $('#gender').val(Gender);
    $('#birthday').val(Birthday);
    $('#phoneNumber').val(Phone);
    // $('#province').val(Province);
    // $('#district').val(District);
    // $('#commune').val(Commune);
    $('#location').val(Location);
    $('#telegram').val(Telegram);
    $('#email').val(Email);
    $('#password').val(Password);
    $('#imgProfile').attr('src',Profile);
    $('#imgCover').attr('src',Cover);

    loca.retrieveLocation('P','','province','ProvId','ProvName',function(){
      $('#province').val(Province);
    });
    loca.retrieveLocation('D',Province,'district','DistId','DistName',function(){
      $('#district').val(District);
    });
    loca.retrieveLocation('C',District,'commune','CommId','CommName',function(){
      $('#commune').val(Commune);
    });
  }

  //-----------------------
  // Retrieve Location


  function provinceChange(){
    $('#province').change(function(){
      var provId = $(this).val();

      $('#district option').not('[hidden]').remove();
      $('#commune option').not('[hidden]').remove();
      
      loca.retrieveLocation('D',provId,'district','DistId','DistName');
    })
  }

  function districtChange(){
    $('#district').change(function(){
      var distId = $(this).val();

      $('#commune option').not('[hidden]').remove();

      loca.retrieveLocation('C',distId,'commune','CommId','CommName');
    })
  }


  //--------------------
  // Update user Info

  function submit(){
    $('#btnSubmit').click(function(){
      postData();
    })
  }

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

    $.ajax({
      type: 'post',
      url: '/Assignment2/Kasekam/App/Server/User/updateUserInfo.php',
      data:{
        userId     : userId,
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
            window.location.replace("../Profile");
          }else{
            alert(data.msg+" "+ data.strError);
          }
      }
    })
  }
});
