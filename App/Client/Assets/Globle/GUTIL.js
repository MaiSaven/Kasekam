//Globle JS

import { UTResponse } from "../Utile/UTResponse.js";

export class GUTIL{

    static Globle(){
        GUTIL.ResponsiveProfile();
    }

    static ResponsiveProfile(){
        UTResponse.getHeightChangeItem('.G-profile', function(height){
            console.log('G-profile height ::::>>> '+ height);
            $('.G-profile').css({'width': height});
        });
    }
}