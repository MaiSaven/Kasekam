import { UTimage } from "../Assets/Utile/UTimage.js";

$(document).ready(function(){

    Init();
    
    function Init(){
      popUpPost();
      popUpIn();
      uploadImage();
      removeImage();
    }
  
    // -------------------
  
    function popUpPost(){
      $('#btn_cancel').click(function(){
        $('.popup_main').toggle(500);
      })
    }
  
    function popUpIn(){
      $('#btn_post_out').click(function(){
        $('.popup_main').toggle(500);
      })
    }
    
    function removeImage(){
      $('#btn_cancel_img').click(function(){
        $('.popup_upload_img').fadeOut(0);
      })
    }
    
    function uploadImage(){
      const btnInput = $('#upload_file_img');
      const imgDisplay = $('#post_image_item');
  
      UTimage.setImage(btnInput, imgDisplay, function(){
        $('.popup_upload_img').css({'display':'block'});
      });
    }
  
  })