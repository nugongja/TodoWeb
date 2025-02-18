document.addEventListener("DOMContentLoaded", () => {
    function toggleTaskComplete(event) {
        if (event.target.closest(".task-complete")) {
            const taskCard = event.target.closest(".task-card");
            const taskId = taskCard.getAttribute("data-id");

            if (!taskId) {
                console.error("Task ID not found");
                return;
            }

            fetch(`http://localhost:8080/todo/taskComplete/${taskId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => {
                if (response.ok) {
                    // 같은 taskId를 가진 모든 요소를 찾아 상태 동기화
                    document.querySelectorAll(`[data-id='${taskId}']`).forEach(task => {
                        task.classList.toggle("completed");
                    });

                    fetchTasksStats();  // 통계 갱신
                } else {
                    console.error("Failed to toggle task status");
                }
            })
            .catch(error => console.error("Error toggling task status:", error));
        }
    }

    // 기존 태스크에도 이벤트 적용
    document.querySelector(".task-section").addEventListener("click", toggleTaskComplete);

    // Load More에서 불러온 태스크에도 이벤트 적용
    document.addEventListener("click", function (event) {
        if (event.target.closest(".new-task-section .task-complete")) {
            toggleTaskComplete(event);
        }
    });
});
