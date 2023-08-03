function solution(myString) {
    let a = myString.split('x')
    return (a.map((e, i) => e.length))
}