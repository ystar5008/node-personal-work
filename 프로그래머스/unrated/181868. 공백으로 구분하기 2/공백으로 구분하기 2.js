function solution(my_string) {
  const words = my_string.split(' ').filter(word => word.trim() !== '');
  return words;
}