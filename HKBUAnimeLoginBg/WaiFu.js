//https://konachan.net/post.json?limit=5&tags=width:1920 height:1080 order:random
let PhotoURL
CheckDOM()
FetchPic()

function FetchPic(){
    // content script
    chrome.runtime.sendMessage({
        //param pass to WaiFuBg.js into "request" obj
        limit: 2,
        tags: 'width:1920 height:1080 order:random rating:safe'
    },
    //receive data from WaFuBg.js
    response => {
        PhotoURL = response.jpg
        /*then(res=>window.URL.createObjectURL(new Blob([res])))
        let b = response.blob*/
        CheckDOM("ReplaceImg")
        console.log(response.status)
        console.log(response.jpg)
        console.log(response.json)
    })
}
    

//TODO
function CheckDOM(action){
   if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded',afterDOMLoaded(action));
    } else {
        afterDOMLoaded(action);
    }
}

function afterDOMLoaded(action){
    //Everything that needs to happen after the DOM has initially loaded.
    switch (action){
        case "ReplaceImg":
            ReplaceImg()
            break;
        default:
            console.log("DOMloaded")
            break
    }
}

function ReplaceImg(){
    var Bgpic = document.getElementById("body_sign_in")
    Bgpic.style.backgroundImage = `url('${PhotoURL}')`
}