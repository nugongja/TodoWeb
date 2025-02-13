document.addEventListener("DOMContentLoaded", function () {
    const addTaskBtn = document.getElementById("add-task-btn");

    addTaskBtn.addEventListener("click", async function () {
        const title = document.getElementById("task-title").value;
        const detail = document.getElementById("task-detail").value;
        const date = document.getElementById("task-start").value;  // id 유지

        if (!title || !detail || !date) {
            alert("모든 필드를 입력해야 합니다!");
            return;
        }

        const newTask = {
            title: title,
            todo: detail,
            startDate: `${date}T00:00:00`,  // 날짜 포맷 맞추기
            endDate: `${date}T23:59:59`
        };

        try {
            const response = await fetch("http://localhost:8080/todo/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            });

            if (response.ok) {
                console.log("Task added successfully");

                // todayTasks.js의 fetchTasks() 호출
                if (typeof fetchTasks === "function") {
                    fetchTasks();  // 작업 목록 갱신
                } else {
                    console.warn("fetchTasks 함수가 정의되지 않았습니다.");
                }

            } else {
                console.error("Failed to add task");
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    });
});
