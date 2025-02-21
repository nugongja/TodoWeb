document.addEventListener("DOMContentLoaded", function () {
    const addTaskBtn = document.getElementById("add-task-btn");

    addTaskBtn.addEventListener("click", async function () {
        const titleInput = document.getElementById("task-title");
        const detailInput = document.getElementById("task-detail");
        const dateInput = document.getElementById("task-start");

        const title = titleInput.value;
        const detail = detailInput.value;
        const date = dateInput.value;

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

                // 입력 필드 비우기
                titleInput.value = "";
                detailInput.value = "";
                dateInput.value = "";
                console.log("입력 필드 초기화 완료!");

                // Task 추가된 날짜를 반영하여 fetchTasksByDate 호출
                fetchTasksByDate(date);
                fetchTasksStats();

                // Load More도 새로운 날짜에 맞춰 갱신
                document.dispatchEvent(new CustomEvent("dateSelected", { detail: date }));
                document.dispatchEvent(new Event("taskAdded"));
            } else {
                console.error("Failed to add task");
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    });
});
