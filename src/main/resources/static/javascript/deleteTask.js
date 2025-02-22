async function deleteTask(taskId, selectedDate, taskElement) {
    try {
        const response = await fetch(`http://localhost:8080/todo/delete/${taskId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            console.log(`✅ Task ${taskId} deleted successfully`);

            // ✅ 화면(task-section)에서 해당 Task 제거
            taskElement.remove();

            // ✅ Load More에서도 반영되도록 이벤트 트리거
            document.dispatchEvent(new Event("taskDeleted"));

            // ✅ 현재 날짜의 Task 다시 불러오기 (갱신)
            fetchTasksByDate(selectedDate);

            // ✅ Task Stats도 업데이트
            fetchTaskStats();
        } else {
            console.error(`❌ Failed to delete task ${taskId}`);
        }
    } catch (error) {
        console.error(`❌ Error deleting task ${taskId}:`, error);
    }
}
