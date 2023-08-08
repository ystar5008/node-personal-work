function solution(num, k) {
    let arr = String(num).split('')

    return arr.indexOf('' + k) + 1 ? arr.indexOf('' + k) + 1 : -1
}