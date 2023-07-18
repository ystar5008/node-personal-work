function solution(num_list) {
  let add = 0
  let multi = 1

  for (let i = 0; i < num_list.length; i++) {
    multi *= num_list[i]
  }

  for (let i = 0; i < num_list.length; i++) {
    add += num_list[i]
  }
  return add ** 2 > multi ? 1 : 0;
}