function createGeneralId(idLength = 8){
    return randomId = (Math.round(Math.random() * idLength)).toString().padStart(idLength, 0);
}

function createId(idType, refId=null, refCount=null){
    const generalId = createGeneralId();
    let prefix = "";
    switch(idType){
        case "note":
            prefix = "n";
            break;
        case "memo":
            prefix = "m";
            break;
        case "conversation":
            prefix = "c";
            break;
        case "hyper":
            if(refId == null){
                throw Error("'refId' is missing while create hyperId.");
            }
            else if(refCount == null){
                throw Error("'recCount' is missing while create hyperId.");
            }
            else{
                prefix = `h_${hyperTarget}`;
            }
        default:
            throw Error(`idType: '${idType}'is not supported.`);
    }

    return `${prefix}_${generalId}`;
}