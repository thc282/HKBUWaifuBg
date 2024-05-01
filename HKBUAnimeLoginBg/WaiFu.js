//https://konachan.net/post.json?limit=2&tags=width:1920 height:1080 order:random
var Bgpic = undefined
let LoadingGIF = chrome.runtime.getURL('windows-xp-loading-screen.gif')

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
        PhotoURL = response.base64
        CheckDOM("ReplaceImg")
        console.log(`data to base64 :\n${response.base64}`)
        console.log(response.status)
        console.log(response.jpg)
        console.log(`Photo source: ${response.jpg}`)
        console.log("Search result: ")
        console.log(response.json)
        console.log("If Error: " + response.err)
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
            RemoveOriBg()
            AdjustLoginWrapper()
            break
    }
}

function ReplaceImg(){
    Bgpic.style.backgroundImage = `url(${PhotoURL})`
}

function RemoveOriBg(element){
    if(element !== undefined){
        Bgpic = element
        Bgpic.style.backgroundImage = `url(${LoadingGIF})`;
        console.log("Original img set to Loading Img....")
    }else{
        console.log("Waiting Original img bg")
        waitForElementToExist("#body_sign_in")
    }
}

function AdjustLoginWrapper(element){
    if(element !== undefined){
        //The wrapper element
        element.style.backgroundColor = "rgba(255,255,255,0.75)"
        //Lower part of wrapper
        let low = document.querySelector('[class="center-align"]')
        low.style.setProperty("background-color", 'initial')
        console.log("Wrapper Adjusted")
    }else{
        console.log("Waiting Wrapper")
        waitForElementToExist('#content')
    }
}

function waitForElementToExist(selector) {
    if (document.querySelector(selector)) {
      console.log(`${selector} elem exists`);
      switch(selector){
        case '#content':
            return AdjustLoginWrapper(document.querySelector(selector));
        case "#body_sign_in":
            return RemoveOriBg(document.querySelector(selector));
      }
      
    }
  
    const intervalID = setInterval(() => {
      if (document.querySelector(selector)) {
        console.log(`${selector} elem exists`);
        clearInterval(intervalID);
        switch(selector){
            case '#content':
                return AdjustLoginWrapper(document.querySelector(selector));
            case "#body_sign_in":
                return RemoveOriBg(document.querySelector(selector));
          }
      }
    }, 100);
}