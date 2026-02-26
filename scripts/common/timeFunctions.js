function getDow(dayCode, kor=true){
    const dowKor = ["일", "월", "화", "수", "목", "금", "토"];
    const dowEng = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "sat"];

    if(kor){
        return dowKor[dayCode];
    }
    else{
        return dowEng[dayCode];
    }
}

function getTimestamp(hrFormat=12){
    const now = new Date();
    
    let timestamp = "";

    timestamp += now.getFullYear().toString() + ".";
    timestamp += (now.getMonth() + 1).toString().padStart(2, "0") + ".";
    timestamp += now.getDate().toString().padStart(2, "0");
    timestamp += " (" + getDow(now.getDay()) + ") ";
    let hr = now.getHours()
    if(hrFormat == 12){
        hr = hr > 12 ? hr - 12 : hr;
    }
    timestamp += hr.toString().padStart(2, "0") + ":";
    timestamp += now.getMinutes().toString().padStart(2, "0") + ":";
    timestamp += now.getSeconds().toString().padStart(2, "0");

    return timestamp;
}

export { getTimestamp, getDow };