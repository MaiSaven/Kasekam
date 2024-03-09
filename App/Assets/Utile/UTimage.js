// UTimage.js
export class UTimage {

    //()=> Test Alert
    static alt(x){
        alert(x);
    }
    
    //()=> Upload Image
    static setImage(btnInput, imgDisplay, callBack){

      const input_img = $(btnInput);
      const output_img = $(imgDisplay);

      input_img.change(function(){
      
      var files = this.files[0];
      var fileReader = new FileReader();
      var fileBase64 = '';
      
      //Load Image into img tag
      fileReader.onload = function(){
          fileBase64 = fileReader.result;
          output_img.attr('src', fileBase64);
      };
      
      // Readfile to display
      fileReader.readAsDataURL(files);
      console.log(files.name);
      
      //CallBack to display element,// $('.popup_upload_img').css({'display':'block'});
      callBack();
      })
    }
  }