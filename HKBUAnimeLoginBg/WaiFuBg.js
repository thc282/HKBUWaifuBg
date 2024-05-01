// background script    
chrome.runtime.onMessage.addListener((request, sender, senderResponse)=> {
    const url = `https://konachan.net/post.json?limit=${request.limit}&tags=${request.tags}`;
    //Get data from url
    const getData = () => fetch(url).then(res => res.json())
    const getBlob = (data) => fetch(data).then(res=>res.blob())
    const getBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                resolve(reader.result)
            }
        })
    }

    var getResult = async () => {
        try {
            let result = await getData()
            let PhotoBlob = await getBlob(result[0].sample_url)
            let base64data = await getBase64(PhotoBlob)
            //Send response back to WaiFu
            senderResponse({status: 'success', base64:base64data, jpg:result[0].sample_url, json:result});
        } catch (error) {
            getResult()
            senderResponse({status: false, err: error})
        }
    }
    getResult()
    return true
});