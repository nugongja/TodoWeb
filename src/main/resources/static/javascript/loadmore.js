document.addEventListener("DOMContentLoaded", function () {
    const main = document.querySelector(".main");
    const toggleButton = document.getElementById("load-more-btn");
    let newTaskSection = null;
    let isTaskSectionVisible = false;
    let selectedDate = null;  // 선택된 날짜를 저장할 변수

    // 선택된 날짜를 갱신하는 함수
    function updateSelectedDate(date){
        selectedDate = date;
    }

    async function fetchLoadMoreTasks() {
        try {

            // 선택된 날짜가 없으면 오늘 날짜로 기본 설정
            if(!selectedDate){
                const today = new Date();
                selectedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            }

            console.log(`Fetching Load More tasks for: ${selectedDate}`);

            const encodedDate = encodeURIComponent(selectedDate);
            const response = await fetch(`http://localhost:8080/todo/date?date=${encodedDate}`);
            const tasks = await response.json();

            let taskHTML = "";
            tasks.forEach(task => {
                let completedClass = task.checked ? "completed" : "";

                taskHTML += `
                    <div class="task-card ${completedClass}" data-id="${task.id}">
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
                    </div>
                `;
            });

            return taskHTML;
        } catch (error) {
            console.error("Error fetching tasks:", error);
            return "<p>할 일을 불러오는데 실패했습니다.</p>";
        }
    }

    async function toggleLoadMoreTasks() {
        if (!isTaskSectionVisible) {
            if (newTaskSection) {
                newTaskSection.remove();
            }

            newTaskSection = document.createElement("div");
            newTaskSection.classList.add("new-task-section");

            const taskHTML = await fetchLoadMoreTasks();
            newTaskSection.innerHTML = `
                <div class="task-list-container">
                    ${taskHTML}
                </div>
            `;

            main.appendChild(newTaskSection);

            setTimeout(() => {
                newTaskSection.classList.add("slide-in");
            }, 10);

            isTaskSectionVisible = true;
        } else {
            newTaskSection.classList.remove("slide-in");
            setTimeout(() => {
                newTaskSection.remove();
            }, 300); // 애니메이션 후 삭제
            isTaskSectionVisible = false;
        }
    }

    // "Load More" 버튼을 클릭하면 열리고, 다시 누르면 닫힘
    toggleButton.addEventListener("click", toggleLoadMoreTasks);

    // Load More가 열려 있는 상태에서 다른 곳을 클릭하면 닫힘
    document.addEventListener("click", function (event) {
        if (isTaskSectionVisible && newTaskSection) {
            const isClickInside = newTaskSection.contains(event.target) || toggleButton.contains(event.target);
            if (!isClickInside) {
                newTaskSection.classList.remove("slide-in");
                setTimeout(() => {
                    newTaskSection.remove();
                }, 300);
                isTaskSectionVisible = false;
            }
        }
    });

    // Task 추가 시 Load More 자동 갱신
    document.addEventListener("taskAdded", function () {
        if (isTaskSectionVisible) {
            toggleLoadMoreTasks();
        }
    });

    // 캘린더에서 날짜 클릭 시 선택된 날짜 업데이트
    document.addEventListener("dateSelected", function(event){
        updateSelectedDate(event.detail);
    });
});
