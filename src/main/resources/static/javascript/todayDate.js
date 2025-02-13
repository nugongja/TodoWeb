document.addEventListener("DOMContentLoaded", function () {
    // JavaScript로 현재 날짜와 요일 설정
    const date = new Date();

    // 요일 이름 배열
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // 월 이름 배열
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // 현재 요일과 날짜 추출
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // 요소에 텍스트 설정
    document.getElementById("day-name").textContent = dayName;
    document.getElementById("full-date").textContent = `${day}, ${month} ${year}`;
});