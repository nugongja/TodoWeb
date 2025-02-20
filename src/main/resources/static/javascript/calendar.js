document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.querySelector(".calendar");

    const date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth();
    const todayDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    function renderCalendar(year, month) {
        calendarContainer.innerHTML = "";

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let html = `
            <div class="calendar-header">
                <button id="prev-month">&lt;</button>
                <h3>${year} ${months[month]}</h3>
                <button id="next-month">&gt;</button>
            </div>
            <div class="calendar-body">
                <div class="day-names">
                    <div>SU</div><div>MO</div><div>TU</div><div>WE</div><div>TH</div><div>FR</div><div>SA</div>
                </div>
            <div class="days">
        `;

        for (let i = 0; i < firstDay; i++) {
            html += `<div class="empty"></div>`;
        }

        for (let day = 1; day <= lastDate; day++) {
            let formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            let selectedClass = formattedDate === todayDate ? "selected" : "";
            html += `<div class="day ${selectedClass}" data-date="${formattedDate}">${day}</div>`;
        }

        html += `</div></div>`;
        calendarContainer.innerHTML = html;

        document.getElementById("prev-month").addEventListener("click", () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentYear, currentMonth);
        });

        document.getElementById("next-month").addEventListener("click", () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentYear, currentMonth);
        });

        document.querySelectorAll(".day").forEach(dayElement => {
             dayElement.addEventListener("click", function () {
                const selectedDate = this.getAttribute("data-date");  // 올바른 날짜 값 가져오기
                console.log(`Selected date: ${selectedDate}`);

                // 이전에 선택된 날짜에서 `.selected` 제거
                document.querySelectorAll(".day").forEach(el => el.classList.remove("selected"));

                // 현재 선택한 날짜에 `.selected` 추가
                this.classList.add("selected");

                fetchTasksByDate(selectedDate);  // 날짜 값 전달

                // 선택된 날짜를 Load More로 전달
                document.dispatchEvent(new CustomEvent("dateSelected", { detail: selectedDate }));
            });
        });
    }

    renderCalendar(currentYear, currentMonth);
    fetchTasksByDate(todayDate);
});
