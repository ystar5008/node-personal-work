function solution(phone_book) {
    phone_book.sort(); // 전화번호부를 사전순으로 정렬
    for (let i = 0; i < phone_book.length - 1; i++) {
        if (phone_book[i + 1].startsWith(phone_book[i])) { // 접두어 확인
            return false;
        }
    }
    return true;
}


