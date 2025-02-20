document.addEventListener("DOMContentLoaded", function (){
    const today = new Date();
    const todayDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    console.log(`Initial fetch for today"'"s date: ${todayDate}`);
    fetchTasksByDate(todayDate);  // 올바른 날짜 값 전달
});

async function fetchTasksByDate(selectedDate) {
    const taskSection = document.querySelector(".task-section");
    const loadMoreButton = document.querySelector(".task-load");

    console.log(`Fetching tasks for date: ${selectedDate}`);  // 디버깅 로그 추가

    try {
        // URL 인코딩 적용하여 올바른 요청 전송
        const encodedDate = encodeURIComponent(selectedDate);
        const response = await fetch(`http://localhost:8080/todo/date?date=${encodedDate}`);

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        const tasks = await response.json();
        taskSection.innerHTML = "";

        if (tasks.length === 0) {
            // task가 없을 때 'task-empty'클래스 적용
            taskSection.classList.remove("task-grid")
            taskSection.classList.add("task-empty")
            taskSection.innerHTML = `
            <div>
                <h3>${selectedDate}</h3>
                <p style="text-align: center;">No tasks for this date.</p>
            </div>
            `;
            loadMoreButton.style.display = "none";
            return;
        }

        // task가 있을 때 'task-grid' 클래스 적용
        taskSection.classList.remove("task-empty")
        taskSection.classList.add("task-grid")

        const visibleTasks = tasks.slice(0, 4);

        visibleTasks.forEach(task => {
            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");
            taskCard.setAttribute("data-id", task.id);

            if (task.checked) {
                taskCard.classList.add("completed");
            }

            taskCard.innerHTML = `
                <div class="task-contents">
                    <h3>${task.title}</h3>
                    <div class="task-info">
                        <p>${task.todo}</p>
                    </div>
                    <div class="task-date">
                        <p>Start: ${task.startDate.split("T")[0]}</p>
                    </div>
                </div>
                <div class="task-button-container">
                    <button type="button" class="task-delete">
                        <img src="img/delete.svg" width="30px" height="35px">
                    </button>
                    <button type="button" class="task-edit">
                        <img src="img/edit.svg" width="30px" height="30px">
                    </button>
                    <button type="button" class="task-complete">
                        <img src="img/check.svg" width="35px" height="35px">
                    </button>
                </div>
            `;

            taskSection.appendChild(taskCard);
        });

        // Task가 4개 이하일 경우 Load More 버튼 숨김
        loadMoreButton.style.display = tasks.length > 4 ? "flex" : "none";

    } catch (error) {
        console.error("Error fetching tasks for selected date:", error);
    }
}

