function solution(myString) {


    return myString.split('x').filter((v, i) => v !== '').sort();
}