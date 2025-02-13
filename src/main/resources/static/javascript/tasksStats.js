async function fetchTasksStats() {
    const completedTasks = document.querySelector("#stats-complete .stats-count");
    const pendingTasks = document.querySelector("#stats-pending .stats-count");
    const totalTasks = document.querySelector("#stats-created .stats-count");

    try {
        const response = await fetch("http://localhost:8080/todo/getTasksCount");
        const count = await response.json();

        if (count.length === 3) {
            completedTasks.textContent = count[0];
            pendingTasks.textContent = count[1];
            totalTasks.textContent = count[2];
        } else {
            console.error("Unexpected response format:", count);
        }

    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", fetchTasksStats);
