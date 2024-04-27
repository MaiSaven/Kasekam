import { UTCookies } from "../Assets/Utile/UTCookies.js";
import { UTImage } from "../Assets/Utile/UTImage.js";
import { UTResponse } from "../Assets/Utile/UTResponse.js";
import { UTURL } from "../Assets/Utile/UTURL.js";

$(document).ready(function(){

    const userId = UTCookies.getCookie('userId');
    const userIdURL = UTURL.getDataFromURL('UserId');
    var proIdForUpdate ='';
    var proIdForDelete ='';

    Init();
    
    function Init(){
      UTCookies.checkCookie();
      setDefault();
      getUserInfo();
      getProduct();
      popUpIn();
      popUpOut();
      uploadImage();
      removeImage();
      postProduct();
      updateProduct();   
      confirmDeleteYN();  
    }

    function refresh(){
      location.reload();
    }

    function checkUser(){
      var user ='';
      if(userIdURL != null && userIdURL !=''){ 
        user = userIdURL; 
      }else{
        user = userId;
      }
      console.log('user : ' + user);
      return user;
      // window.location.replace("../Profile"); // load current user
    }

    function hideBtnUpdateDelete(){
      if(userIdURL != null && userIdURL !=''){
        if(userIdURL !== userId){
          $('#btnEditUserInfo').css('display','none');
          $('#btnPostOut').css('display','none');
          $('.btn_edit').css('display','none');
          $('.btn_delete').css('display','none');
        }
      }
    }
  
    // -------------------
    function setDefault(){
      $('.popup_main').hide(0);
    }

    function setProcudeImageWidth(){
      UTResponse.getWidthChangeItem('.product_img', function(width){
        console.log('::::>>> '+ width);
        $('.product_img').css({'height': width});
      });
    }

    function clearPost(){
      $('#productName').val('');
      $('#productWeight').val('');
      $('#productWeightType').val('');
      $('#productPriceAmount').val('');
      $('#productCurrency').val('');
      $('#productQuantityFrom').val('');
      $('#productQuantityTo').val('');
      $('#productPeriodFrom').val('');
      $('#productPeriodTo').val('');

      clearUploadImage();
    }

    function clearUploadImage(){
      $('#postImageItem').attr('src','');
      console.log($('#postImageItem').attr('src'));
      $('.popup_upload_img').css({'display':'none'});
      $('#uploadFileImg').val('');
    }

  
    function popUpOut(){
      $('#btnCancel').click(function(){
        $('.popup_main').hide(500);
        clearPost();
      })
    }
  
    function popUpIn(){
      $('#btnPostOut').click(function(){
        $('.popup_main').show(500);
        $('#btnPostProduct').css('display','block');
        $('#btnUpdateProduct').css('display','none');
        // $('.btn_post_product').attr('id','btnPostProduct');
        // $('.btn_post_product').html('Post');

      })
    }
    
    function removeImage(){
      $('#btn_cancel_img').click(function(){
        clearUploadImage();
      })
    }
    
    function uploadImage(){
      const btnInput = $('#uploadFileImg');
      const imgDisplay = $('#postImageItem');
  
      UTImage.setImage(btnInput, imgDisplay, function(){
        $('.popup_upload_img').css({'display':'block'});
      });
    }

    //-----------------------
    // Post Product
    function postProduct(){
      $('#btnPostProduct').click(function(){
        registerProduct();
      })
    }

    function registerProduct(){

      const productName           = $('#productName');
      const productWeight         = $('#productWeight');
      const productWeightType     = $('#productWeightType');
      const productPriceAmount    = $('#productPriceAmount');
      const productCurrency       = $('#productCurrency');
      const productQuantityFrom   = $('#productQuantityFrom');
      const productQuantityTo     = $('#productQuantityTo');
      const productPeriodFrom     = $('#productPeriodFrom');
      const productPeriodTo       = $('#productPeriodTo');
      const productDescription    = $('.productDescription');  // textarea can't get value by id
      const postImageItem         = $('#postImageItem');

      $.ajax({
        type: 'post',
        url: '/Assignment2/Kasekam/App/Server/Product/registerProduct.php',
        data:{
          UserId       :  userId,     
          Name         :  productName.val(),     
          Weight       :  productWeight.val(),      
          WeightType   :  productWeightType.val(),  
          PriceAmount  :  productPriceAmount.val(), 
          Currency     :  productCurrency.val(),    
          QuantityFrom :  productQuantityFrom.val(),
          QuantityTo   :  productQuantityTo.val(),  
          PeriodFrom   :  productPeriodFrom.val(),  
          PeriodTo     :  productPeriodTo.val(),   
          Description  :  productDescription.val(),   
          ImageItem    :  postImageItem.attr('src'), 
        },
        dataType: 'json',
        success:function(data){
          alert(data.msg);
          if(data.strError == '00'){
            refresh();
          }
        }
      })
    }

    function setProduct( ProId, Name, Weight, WeightType, PriceAmount, Currency, QtyFrom, QtyTo, PeriodFrom, PeriodTo, Description, ImageId ){
      
      $('#listProduct').append(
          `
            <div class="col pd-10">
              <div class="product_info box-shadow radius-low box-shadow pd-10">
                
                <button class="btn_edit btn-edit" id="${ProId}"><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="btn_delete btn-edit" id="${ProId}"><i class="fas fa-trash-restore"></i></button>
                
                <div class="product_img">
                    <img src="${ImageId}" class="img radius-low" alt="">
                </div>
                <div class="line"></div>
                <div class="product_buttom pd-x-low">
                  <div class="name">
                    ${Name}
                  </div>
                  <div class="description">
                      ${Description}
                  </div>
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
                <a href="../ProductDetail/index.html?ProdId=${ProId}" target="_top"><button class="btn_community wd-100pt" id="000">View</button></a>
              </div>
            </div>
          `
      )
    }

    //------------------------
    // GET PRODUCT

    function getProduct(){
      $.ajax({
        type: 'post',
        url: '/Assignment2/Kasekam/App/Server/Product/retrieveProductByUser.php',
        data:{
          UserId : checkUser()
        },
        dataType: 'json',
        success:function(data){
          for (const i in data) {
            setProduct( data[i]['ProId'], data[i]['Name'], data[i]['Weight'], data[i]['WeightType'], data[i]['PriceAmount'], data[i]['Currency'], data[i]['QtyFrom'], data[i]['QtyTo'], data[i]['PeriodFrom'], data[i]['PeriodTo'], data[i]['Description'], data[i]['ImageId'] )
            setProcudeImageWidth();
            getUpdateProduct();
            getDeleteProduct();
            hideBtnUpdateDelete();
          }
        }
      })
    }
    
    //------------------------------
    // Update Product Info

    function getUpdateProduct(){
      $('.btn_edit').click(function(){
        $('.popup_main').show(500);
        $('#btnUpdateProduct').css('display','block');
        $('#btnPostProduct').css('display','none');
        // $('.btn_post_product').html('Update');
        // $('.btn_post_product').attr('id','btnUpdateProduct');

        proIdForUpdate = $(this).attr('id');

        console.log('Button Product ID: ' + proIdForUpdate);

        retrieveProductForUpdate(proIdForUpdate);
      })
    }

    function updateProduct(){
      $('#btnUpdateProduct').click(function(){
        updateProductInfo();
      })
    }

    function retrieveProductForUpdate(id){
      $.ajax({
        type: 'post',
        url: '/Assignment2/Kasekam/App/Server/Product/retrieveProductForUpdate.php',
        data:{
          ProId : id
        },
        dataType: 'json',
        success:function(data){
          for (const i in data){
            console.log ('ProId  Test => '+ data[i]['ProId']);
            console.log ('Name   Test => '+ data[i]['Name']);
            console.log ('Name   Test => '+ data[i]['ImageId']);

            $('.popup_upload_img').css({'display':'block'});
            // uploadImage();
            setPopupForUpdate(data[i]['Name'], data[i]['Weight'], data[i]['WeightType'], data[i]['PriceAmount'], data[i]['Currency'], data[i]['QtyFrom'], data[i]['QtyTo'], data[i]['PeriodFrom'], data[i]['PeriodTo'], data[i]['Description'], data[i]['ImageId']);
          }
        }
      })
    }

    function setPopupForUpdate(Name, Weight, WeightType, PriceAmount, Currency, QtyFrom, QtyTo, PeriodFrom, PeriodTo, Description, ImageId){
      $('#productName').val(Name);
      $('#productWeight').val(Weight);
      $('#productWeightType').val(WeightType);
      $('#productPriceAmount').val(PriceAmount);
      $('#productCurrency').val(Currency);
      $('#productQuantityFrom').val(QtyFrom);
      $('#productQuantityTo').val(QtyTo);
      $('#productPeriodFrom').val(PeriodFrom);
      $('#productPeriodTo').val(PeriodTo);
      $('.productDescription').val(Description);  // textarea can't get value by id
      $('#postImageItem').attr("src", ImageId);
    }

    function updateProductInfo(){

      console.log('------WHAT?_______---');
      const productName           = $('#productName');
      const productWeight         = $('#productWeight');
      const productWeightType     = $('#productWeightType');
      const productPriceAmount    = $('#productPriceAmount');
      const productCurrency       = $('#productCurrency');
      const productQuantityFrom   = $('#productQuantityFrom');
      const productQuantityTo     = $('#productQuantityTo');
      const productPeriodFrom     = $('#productPeriodFrom');
      const productPeriodTo       = $('#productPeriodTo');
      const productDescription    = $('.productDescription');  // textarea can't get value by id
      const postImageItem         = $('#postImageItem');

      console.log('------------------KOKO-------->>');

      $.ajax({
        type: 'post',
        url: '/Assignment2/Kasekam/App/Server/Product/updateProductInfo.php',
        data:{
          ProId        :  proIdForUpdate,     
          Name         :  productName.val(),     
          Weight       :  productWeight.val(),      
          WeightType   :  productWeightType.val(),  
          PriceAmount  :  productPriceAmount.val(), 
          Currency     :  productCurrency.val(),    
          QuantityFrom :  productQuantityFrom.val(),
          QuantityTo   :  productQuantityTo.val(),  
          PeriodFrom   :  productPeriodFrom.val(),  
          PeriodTo     :  productPeriodTo.val(),   
          Description  :  productDescription.val(),   
          ImageItem    :  postImageItem.attr('src'), 
        },
        dataType: 'json',
        success:function(data){
          alert(data.msg);

          if(data.strError == '00'){
            refresh();
          }
        }
      })
    }

    //------------------
    // User Info detail

    function getUserInfo(){
      $.ajax({
        type: 'post',
        url: '/Assignment2/Kasekam/App/Server/User/retrieveUserInfo.php',
        data:{
          UserId : checkUser()
        },
        dataType: 'json',
        success:function(data){

          if(!data.strError){
            for (const i in data) {
              console.log(data[i]['UserId']);
              console.log(data[i]['First_name']);
              console.log(data[i]['Last_name']);
              setImageCover(data[i]['Cover']);
              setImageProfile(data[i]['Profile']);
              setUserName(data[i]['First_name'], data[i]['Last_name'])
              setUserInfo( data[i]['Province'], data[i]['District'], data[i]['Commune'], data[i]['Location'], data[i]['Phone'], data[i]['Telegram']);
            }
            
          }else{
            console.log(data.msg);
            window.location.replace("../Profile")
          }
        }
      })
    }

    function setImageCover(Cover){
      $('#userImageCover').attr("src", Cover);
    }
    function setImageProfile(Profile){
      $('#userImageProfile').attr("src", Profile);
    }
    function setUserName(First_name, Last_name){
      $('#userName').html(First_name + ' ' + Last_name);
    }
    function setUserInfo(Province, District, Commune, Location, Phone, Telegram){
      $('#address').html(Province +", " + District + ", " + Commune);
      $('#location').html(Location);
      $('#phone').html(Phone);
      $('#telegram').html(Telegram);
      $('#contact').attr("href", Telegram);
    }

    //---------------------------
    // Delete Product

    function getDeleteProduct(){
      $('.btn_delete').click(function(){

        proIdForDelete = $(this).attr('id');

        console.log('Button Delete Product ID: ' + proIdForDelete);
        $('.box_confirm').slideDown();
      })
    }

    function confirmDeleteYN(){

      $('#btnNo').click(function(){
        $('.box_confirm').slideUp();
      })

      $('#btnYes').click(function(){
        deleteProduct();
        $('.box_confirm').slideUp();
      })
    }

    function deleteProduct(){
      $.ajax({
        type: 'post',
        url: '/Assignment2/Kasekam/App/Server/Product/deleteProduct.php',
        data:{
          ProId        :  proIdForDelete,
        },
        dataType: 'json',
        success:function(data){
          alert(data.msg);

          if(data.strError == '00'){
            refresh();
          }else{
            alert(data.msg);
          }
        }
      })
    }


    //=====================

  })