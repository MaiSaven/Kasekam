export class Location {
    setSelectOption(SelectId, Value, Text) {
        $('#' + SelectId).append(`<option value="${Value}">${Text}</option>`);
    }

    retrieveLocation(LocationType, ReqId, IdOfSelectTag, ResId, ResName) {
        //LocationType is Province, District, Commune
        //ReqId is the where id in query
        //SelectIdOfTag is the id of the select tag
        //ResId is result id that return from backend to set to option of select tag. ProvId, DistId, CommId
        //ResName is resule name that return form backend to set to option of select tag. ProvName, DistName, CommName

        // Define mapping of location type
        const type= { 'P': 'retrieveProvince', 'D': 'retrieveDistrict', 'C': 'retrieveCommune' };

        const functionName = type[LocationType];

        $.ajax({
            type: 'post',
            url: '/Assignment2/Kasekam/App/Server/Location/' + functionName + '.php',
            data: {
                Id: ReqId
            },
            dataType: 'json',
            success: (data) => {
                if (data.strError === '99') {
                    alert(data.msg + " " + data.strError);
                } else {
                    data.forEach((item) => {
                        this.setSelectOption(IdOfSelectTag, item[ResId], item[ResName]);
                    });
                }
            }
        });
    }
}





// export class Location{

//     setSelectOption(SelectId, Value, Text){
//         $('#'+ SelectId).append(`<option value="${Value}">${Text}</option>`)
//     }
    
//     retrieveLocation(LocationType, ReqId, IdOfSelectTag, ResId, ResName){
//         //LocationType is Province, District, Commune
//         //ReqId is the where id in query
//         //SelectIdOfTag is the id of the select tag
//         //ResId is result id that return from backend to set to option of select tag. ProvId, DistId, CommId
//         //ResName is resule name that return form backend to set to option of select tag. ProvName, DistName, CommName

//         var type = {'P':'retrieveProvince', 'D':'retrieveDistrict', 'C':'retrieveCommune' };
//         var functionName = '';

//         if(LocationType === 'P'){

//             functionName = type.P;
//         }else if(LocationType === 'D'){

//             functionName = type.D;
//         }else if(LocationType === 'C'){

//             functionName = type.C;
//         }

//         $.ajax({
//             type: 'post',
//             url: '/Assignment2/Kasekam/App/Server/Location/'+functionName+'.php',
//             data: {
//             Id: ReqId
//             },
//             dataType: 'json',
//             success:function(data){

//             if(data.strError == '99'){

//                 alert(data.msg+" "+ data.strError);
//             }else{

//                 for(const i in data){
//                     setSelectOption(IdOfSelectTag, data[i][ResId], data[i][ResName]);
//                 }
//             }
//             }
//         })
//     }
// }

// class Person {
//     name;
  
//     constructor(name) {
//       this.name = name;
//     }
  
//     introduceSelf() {
//       console.log(`Hi! I'm ${this.name}`);
//     }
//   }


//   const giles = new Person("Giles");

//   giles.introduceSelf(); // Hi! I'm Giles
  
  