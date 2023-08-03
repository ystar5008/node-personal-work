function solution(strArr) {


    return strArr.filter(e => {
        return e.includes("ad") !== true
    });
}
