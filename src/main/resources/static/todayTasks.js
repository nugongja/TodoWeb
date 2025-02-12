document.addEventListener("DOMContentLoaded", async function() {
    const taskSection = document.querySelector(".task-section");

    try {
        // API 호출하여 오늘 날짜의 작업 가져오기
        const response = await fetch("http://localhost:8080/todo/today");
        const tasks = await response.json();

        // 기존 task-section 초기화
        taskSection.innerHTML = "";

        // 새로운 task-card 요소 추가
        tasks.forEach(task => {
            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");

            taskCard.innerHTML = `
                <div class="task-contents">
                    <h3>${task.title}</h3>
                    <div class="task-info">
                        <p>${task.todo}</p>
                    </div>
                    <div class="task-date">
                        <p>Start: ${task.startDate.split("T")[0]}</p>
                    </div>
                    <div>
                        <p>Status: ${task.checked ? "Completed" : "Pending"}</p>
                    </div>
                </div>
                <div class="task-button-container">
                    <button type = "button", class="task-delete">
                        <img src="img/delete.svg" width="30px" height="35px"></button>
                    <button type = "button", class="task-edit">
                        <img src="img/edit.svg" width="30px" height="30px"></button>
                    </button>
                    <button type = "button", class="task-complete">
                        <img src="img/check.svg" width="35px" height="35px"></button>
                    </button>
                </div>
            `;

            taskSection.appendChild(taskCard);
        });

    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
});
