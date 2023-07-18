function solution(num_list) {
  let a = ''
  let b = ''
  for (num of num_list) {
    if (num % 2 === 0) {
      a += num
    } else {
      b += num
    }
  }
  return Number(a) + Number(b);
}