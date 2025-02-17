document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".task-section").addEventListener("click", async (event) => {
        if (event.target.closest(".task-complete")) {
            const taskCard = event.target.closest(".task-card");
            const taskId = taskCard.getAttribute("data-id");

            try {
                // 서버에 DELETE 요청 보내기
                const response = await fetch(`http://localhost:8080/todo/taskComplete/${taskId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });


                if (response.ok) {
                    if(taskCard.classList.contains("completed")){
                        taskCard.classList.remove("completed"); // 완료 해제
                    } else{
                        taskCard.classList.add("completed"); // 완료 표시
                    }

                    fetchTasksStats(); // 서버에서 최신 통계 가져오기
                } else {
                    console.error("Failed to delete task from server");
                }
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        }
    });
});
