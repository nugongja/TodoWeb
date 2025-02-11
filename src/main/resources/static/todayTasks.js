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
                <p>${task.title}</p>
                <h3>${task.todo}</h3>
                <p>Start: ${task.startDate.split("T")[0]}</p>
                <p>End: ${task.endDate.split("T")[0]}</p>
                <p>Status: ${task.checked ? "Completed" : "Pending"}</p>
            `;

            taskSection.appendChild(taskCard);
        });

    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
});
