function solution(numbers, direction) {
    if (direction === "right") {
        // 오른쪽으로 회전시킬 때는 배열의 마지막 요소를 맨 앞으로 이동
        const lastElement = numbers.pop();
        console.log(lastElement)
        console.log(numbers.unshift(lastElement));
    } else if (direction === "left") {
        // 왼쪽으로 회전시킬 때는 배열의 첫 번째 요소를 맨 뒤로 이동
        const firstElement = numbers.shift();
        numbers.push(firstElement);
    }

    return numbers;
}