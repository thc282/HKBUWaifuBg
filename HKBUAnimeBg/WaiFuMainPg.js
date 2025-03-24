var Bgpic = undefined;
let LoadingGIF = chrome.runtime.getURL('windows-xp-loading-screen.gif')

var body = document.querySelector("body");
var pageWrapper = document.querySelector("#page-wrapper");
var mainPgPic = document.querySelector("#page");
var mainInner = document.querySelector(".main-inner");
var topNavBar = document.querySelector(".navbar");
var navTab = document.querySelector(".nav-tabs");
var navTabParent = (navTab) ? navTab.parentElement : undefined;
var regionMain = document.querySelector("#region-main");
var buCollapsible = document.querySelector(".bu_collapsible");
var buActive = document.querySelector(".bu_active");
var buContent = document.querySelector(".bu_content");

AdjustWrapper()
FetchPic()

function AdjustWrapper(){
    var bgCover = document.createElement("div")
    bgCover.setAttribute("id", "bgCover")
    bgCover.style.backgroundImage = `url(${LoadingGIF})`
    bgCover.style.backgroundPosition = `0 ${topNavBar.offsetHeight}px`;
    pageWrapper.appendChild(bgCover);
    if(navTabParent) navTabParent.classList.add("navTabParent");
/*     bgCover.setAttribute("id", "bgCover")
    bgCover.style.height = "100%";
    bgCover.style.width = "100%";
    bgCover.style.position = "fixed";
    bgCover.style.backgroundImage = `url(${LoadingGIF})`
    bgCover.style.backgroundSize = "contain";
    bgCover.style.backgroundRepeat = "no-repeat";
    bgCover.style.backgroundPosition = `0 ${topNavBar.offsetHeight}px`; */
    /* if(mainPgPic) mainPgPic.style.backgroundImage = "none";
    mainInner.style.zIndex = "1";
    mainInner.style.backgroundColor = "rgba(255,255,255,0.75)";
    if(navTab) {
        navTab.style.backgroundColor = '#0000';
        navTabParent.style.backgroundColor = '#0000';
    }
    regionMain.style.backgroundColor = '#0000';
    if(buCollapsible){
        buCollapsible.style.backgroundColor = "rgba(119,119,119,0.75)";
        buActive.style.backgroundColor = 'rgba(119,119,119,0.75)';
        buContent.style.backgroundColor = 'rgba(241,241,241,0.75)';
    } */
}

function FetchPic(){
    // content script
    chrome.runtime.sendMessage({
        //param pass to WaiFuBg.js into "request" obj
        limit: 2,
        tags: 'width:1920 height:1080 order:random rating:safe'
    },
    //receive data from WaFuBg.js
    response => {
        //PhotoURL = response.jpg
        /*then(res=>window.URL.createObjectURL(new Blob([res])))
        let b = response.blob*/
        PhotoURL = response.base64
        bgCover.style.backgroundImage = `url(${PhotoURL})`
        console.log(`data to base64 :\n${response.base64}`)
        console.log(response.status)
        console.log(`Photo source: ${response.jpg}`)
        console.log("Search result: ")
        console.log(response.json)
        console.log("If Error: " + response.err)
    })
}

