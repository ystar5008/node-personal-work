function solution(binomial) {
    let calcul = binomial.split(' ')

    if (calcul[1] === '*') {
        return Number(calcul[0]) * Number(calcul[2])
    }
    if (calcul[1] === '+') {
        return Number(calcul[0]) + Number(calcul[2])
    }
    if (calcul[1] === '-') {
        return Number(calcul[0]) - Number(calcul[2])
    }

}