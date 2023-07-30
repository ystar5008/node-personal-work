function solution(progresses, speeds) {
    const deployDays = progresses.map((progress, index) => Math.ceil((100 - progress) / speeds[index]));
    // 각 기능이 개발되는데 걸리는 일수를 계산한 배열 deployDays를 생성합니다.

    let maxDay = deployDays[0]; // 첫 번째 기능의 개발 일수를 최대 일수로 초기화합니다.
    let count = 1; // 배포될 기능 개수를 세는 변수를 1로 초기화합니다. (첫 번째 기능은 항상 배포 가능하므로)

    const answer = []; // 결과를 담을 배열을 생성합니다.

    for (let i = 1; i < deployDays.length; i++) {
        if (deployDays[i] <= maxDay) {
            // 현재 기능이 최대 일수보다 작거나 같다면 함께 배포 가능합니다.
            count++;
        } else {
            // 현재 기능이 최대 일수보다 크다면 이전까지의 기능들을 배포합니다.
            answer.push(count);
            count = 1; // 현재 기능부터 다시 배포 개수를 세기 위해 count를 1로 초기화합니다.
            maxDay = deployDays[i]; // 최대 일수를 현재 기능의 일수로 업데이트합니다.
        }
    }

    // 남은 기능들의 배포 개수를 추가합니다.
    answer.push(count);

    return answer;
}
