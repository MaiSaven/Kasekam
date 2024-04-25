export class UTURL{
    
    static getDataFromURL(str){
        var currentURL = window.location.href;
        var url = new URL(currentURL);
        var searchParams = url.searchParams;
        var result = searchParams.get(str);

        console.log("URL : "+ result); // Output: 170324130420001
        return result;
    }
}