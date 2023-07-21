function solution(myString, pat) {



    let a = myString.toLowerCase()
    let b = pat.toLowerCase()
    console.log(a.includes(b))
    return a.includes(b) ? 1 : 0
}