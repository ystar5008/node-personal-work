function solution(my_string, alp) {
  let answer = my_string.split('').map(e => {
    if (e === alp) {
      return e.toUpperCase()
    } else {
      return e
    }
  });
  return answer.join('')
}