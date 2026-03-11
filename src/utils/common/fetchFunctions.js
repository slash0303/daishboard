async function getData(url, params=null){
    let queryUrl = url;
    if(params != null){
        const queryString = new URLSearchParams(params).toString()
        queryUrl += "?" + queryString;
    }
    console.log(queryUrl);
    const response = await fetch(queryUrl);

    return response;
}

async function postData(url, params=null) {
    const reponse = await fetch(url, {
        method: "POST",
        body: JSON.stringify(params)
    });
}

export { getData, postData };