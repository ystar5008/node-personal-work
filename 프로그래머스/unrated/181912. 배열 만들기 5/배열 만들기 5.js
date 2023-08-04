function solution(intStrs, k, s, l) {
    let answer = [];
    //s번인덱스에서 시작하는 길이 l짜리 k보다 큰 문자열 배열로리턴
    let arr = intStrs.map(e => {
        return Number(e.substr(s, l)) > k ? Number(e.substr(s, l)) : null
    })

    return arr.filter(e => e);
}