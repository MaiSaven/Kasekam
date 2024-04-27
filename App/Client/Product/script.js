import { UTCookies } from "../Assets/Utile/UTCookies.js";
import { UTImage } from "../Assets/Utile/UTImage.js";
import { UTResponse } from "../Assets/Utile/UTResponse.js";

$(document).ready(function(){

    Init();
    
    function Init(){
      // UTCookies.checkCookie();
      getProduct();
    }
    // -------------------

    function setProcudeImageWidth(){
      UTResponse.getWidthChangeItem('.product_img', function(width){
        console.log('::::>>> '+ width);
        $('.product_img').css({'height': width});
      });
    }

    function fetchData( ProId, Name, Weight, WeightType, PriceAmount, Currency, QtyFrom, QtyTo, PeriodFrom, PeriodTo, Description, ImageId ){
      
      $('#listProduct').append(
          `
            <div class="col pd-10">
              <div class="product_info box-shadow radius-low box-shadow pd-10">
                
                <div class="product_img">
                    <img src="${ImageId}" class="img radius-low" alt="">
                </div>
                <div class="line"></div>
                <div class="product_buttom pd-x-low">
                  <div class="name">
                  ${Name}
                  </div>
                  <div class="price">
                  ${Weight} ${WeightType} = ${PriceAmount} ${Currency}
                  </div>
                  <div class="sale">
                    Sale Quantiy : ${QtyFrom} ${WeightType} - ${QtyTo} ${WeightType}
                  </div>
                  <div class="available">
                    Availble : ${PeriodFrom} - ${PeriodTo}
                  </div>
                </div>
                <a href="../ProductDetail/index.html?ProdId=${ProId}" target="_top"><button class="btn_community wd-100pt" id="000">View</button></a>
              </div>
            </div>
          `
      )
    }


    function getProduct(){
      $.ajax({
        type: 'post',
        url: '/Assignment2/Kasekam/App/Server/Product/retrieveAllProduct.php',
        data:{
          UserId : 'cus9999999'
        },
        dataType: 'json',
        success:function(data){

          if(!data.strError){
            for (const i in data) {
              fetchData( data[i]['ProId'], data[i]['Name'], data[i]['Weight'], data[i]['WeightType'], data[i]['PriceAmount'], data[i]['Currency'], data[i]['QtyFrom'], data[i]['QtyTo'], data[i]['PeriodFrom'], data[i]['PeriodTo'], data[i]['Description'], data[i]['ImageId'] )
              setProcudeImageWidth();
            }
          }else{
            alert('error.');
            console.log(data.msg);

            $("#listProduct").html( `<div class="data_not_found mg-auto">
                                       <h2 class="text-center">${data.msg}</h2>
                                     </div>`);
          }
        }
      })
    }

  })