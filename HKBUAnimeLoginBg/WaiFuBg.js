// background script    
chrome.runtime.onMessage.addListener((request, sender, senderResponse)=> {
    const url = `https://konachan.net/post.json?limit=${request.limit}&tags=${request.tags}`;
    //Get data from url
    const getData = () => fetch(url).then(res => res.json())
    //const getBlob = (data) => fetch(data).then(res=>new Blob([res]))
    let result

    var getResult = async () => {
        try {
            result = await getData()
            //PhotoBlob = await getBlob(new URL(result[0].sample_url))
            //Send response back to WaiFu
            senderResponse({status: 'success', jpg:result[0].sample_url, json:result});
        } catch (error) {
            getResult()
            senderResponse({status: false, err: error})
        }
    }
    getResult()
    return true
});