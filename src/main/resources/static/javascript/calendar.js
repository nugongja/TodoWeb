document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.querySelector(".calendar");

    const date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth();

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
            html += `<div class="day">${day}</div>`;
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
    }

    renderCalendar(currentYear, currentMonth);
});
