// // UTResponse.js

// export class UTResponse{
    
//     static getWidthChangeItem( element, callback ) {

//         //width default
//         var item = document.querySelector(element);
//         var widthDefault = item.offsetWidth;
//         callback( widthDefault );
        
//         //width change screen size
//         window.addEventListener('resize', function() {
  
//           var item = document.querySelector(element);
//           var width = item.offsetWidth;
//           widthDefault = width;
          
//           callback( widthDefault );
//         });
//     }

//     static getHeightChangeItem( element, callback ) {

//         //Height default
//         var item = document.querySelector(element);
//         var heightDefault = item.offsetHeight;
//         callback( heightDefault );
        
//         //Height change screen size
//         window.addEventListener('resize', function() {
  
//           var item = document.querySelector(element);
//           var height = item.offsetHeight;
//           heightDefault = height;
          
//           callback( heightDefault );
//         });
//     }
// }

//Support Jquery <<<<<<<<<<<

export class UTResponse {
    
  static getWidthChangeItem(element, callback) {
      //width default
      var widthDefault = $(element).width();
      callback(widthDefault);
      
      //width change screen size
      $(window).on('resize', function() {
          var width = $(element).width();
          widthDefault = width;
          callback(widthDefault);
      });
  }

  static getHeightChangeItem(element, callback) {
      //Height default
      var heightDefault = $(element).height();
      callback(heightDefault);
      
      //Height change screen size
      $(window).on('resize', function() {
          var height = $(element).height();
          heightDefault = height;
          callback(heightDefault);
      });
  }
}
