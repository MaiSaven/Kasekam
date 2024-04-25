import { GUTIL } from "../Assets/Globle/GUTIL.js";
import { UTResponse } from "../Assets/Utile/UTResponse.js";
import { UTURL } from "../Assets/Utile/UTURL.js";

$(document).ready(function(){

  Init();

  function Init(){
    setProcudeImageWidth();
    GUTIL.Globle();
    getProduct();
    back_onclick();
  }

  var UserId = '';


  //-------------------------

  function setProcudeImageWidth(){
    UTResponse.getWidthChangeItem('.product_img', function(width){
      console.log('product_img width ::::>>> '+ width);
      $('.product_img').css({'height': width});
    });
  }

  //-----------------------
  // Product Info

  function getProduct(){
    $.ajax({
      type: 'post',
      url: '/Assignment/Kasekam/App/Server/Product/retrieveProductDetail.php',
      data:{
        ProId : UTURL.getDataFromURL("ProdId")
      },
      dataType: 'json',
      success:function(data){
        if(!data.strError){
          for (const i in data) {
            UserId = data[i]['UserId'];
            setProductInfo( data[i]['Name'], data[i]['Weight'], data[i]['WeightType'], data[i]['PriceAmount'], data[i]['Currency'], data[i]['QtyFrom'], data[i]['QtyTo'], data[i]['PeriodFrom'], data[i]['PeriodTo'], data[i]['Description']);
            setProductImage( data[i]['ImageId'] );
            setProcudeImageWidth();
            getUserInfo();
          }
          console.log('UserID = ' + UserId);
          
        }else{
          console.log(data.msg);

          $("#productImage").html( `<div class="data_not_found mg-auto">
                                     <h2 class="text-center">${data.msg}</h2>
                                   </div>`);
        }
      }
    })
  }


  function setProductImage(ImageId ){
      
    $('#productImage').append(
        `
        <div class="product_img">
            <img src="${ImageId}" class="img radius-low" alt="">
        </div>
        `
    )
  }

  function setProductInfo(Name, Weight, WeightType, PriceAmount, Currency, QtyFrom, QtyTo, PeriodFrom, PeriodTo, Description ){
    $('#productInfo').append(
        `
        <div class="line"></div>
            <div class="product_buttom pd-x-low">
            <div class="name">
                ${Name}
            </div>
            <div class="description">
                ${Description}
            </div>
            <div class="line"></div>
            <div class="price">
                ${Weight} ${WeightType} = ${PriceAmount} ${Currency}
            </div>
            <div class="sale">
                Sale Quantiy : ${QtyFrom} ${WeightType} - ${QtyTo} ${WeightType}
            </div>
            <div class="available">
                Stock : ${PeriodFrom} - ${PeriodTo}
            </div>
            </div>
        <div class="line"></div>
        `
    )
  }

  //----------------------------
  //User Info

  function getUserInfo(){
    $.ajax({
      type: 'post',
      url: '/Assignment/Kasekam/App/Server/User/retrieveUserInfo.php',
      data:{
        UserId : UserId
      },
      dataType: 'json',
      success:function(data){
        if(!data.strError){
          for (const i in data) {
            setUserInfo(data[i]['UserId'], data[i]['Profile'], data[i]['First_name'], data[i]['Last_name'], data[i]['Phone'], data[i]['Telegram'], data[i]['Province'], data[i]['District'], data[i]['Commune'], data[i]['Location'] )
            console.log('Email = ' + data[i]['Email']);
            GUTIL.ResponsiveProfile();
          }
          
        }else{
          console.log(data.msg);
          $("#userInfo").html( `<div class="data_not_found mg-auto">
                                     <h2 class="text-center">${data.msg}</h2>
                                   </div>`);
        }
      }
    })
  }

  function setUserInfo(UserId, Profile, First_name, Last_name, Phone, Telegram, Province, District, Commune, Location ){
    $('#userInfo').prepend(
        `
        <!-- User Box -->
        <div class="user_box">
          <div class="user_header pd-10 line-flex">
            <a href="../Profile/index.html?UserId=${UserId}">
              <div class="G-profile radius-hig">
                <img src="${Profile}" class="img radius-hig" alt="">
              </div>
            </a>
            <div class="name line-flex aline-center mg-l-10">
              <a href="../Profile/index.html?UserId=${UserId}" class="rm-underline"><h1 class="font-24">${First_name} ${Last_name}</h1></a>
            </div>
          </div>

          <div class="line"></div>

          <!-- user info detail -->
          <div class="user_info_detail pd-10">
            <div class="user_detail">
              <div class="address">
                  <p>Address : ${Province}, ${District}, ${Commune}</p>
              </div>
              <div class="location">
                  <p>Location : ${Location}</p>
              </div>
              <div class="phone">
                  <p>Phone : ${Phone}</p>
              </div>
              <div class="telegram">
                  <p>Telegram : ${Telegram}</p>
              </div>
              <button class="btn_community"><a href="${Telegram}" class="rm-underline text-white">Contact <i class="fa-brands fa-telegram"></i></a></button>
            </div>
          </div>
        </div>
        `
    )
  }

  //-----------------------------
  // Button Back

  function back_onclick(){
    $('#btnBack').click(function(){
      window.history.back();
      // window.history.go(-1);
    })
  }




});
