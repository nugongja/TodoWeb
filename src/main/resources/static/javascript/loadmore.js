document.addEventListener("DOMContentLoaded", function () {
    const main = document.querySelector(".main");
    const toggleButton = document.getElementById("load-more-btn");
    let newTaskSection = null; // 새로운 섹션을 저장할 변수
    let isTaskSectionVisible = false; // 현재 상태 추적

    toggleButton.addEventListener("click", function () {
        if (!isTaskSectionVisible) {
            // 새로운 task 섹션이 없으면 생성
            if (!newTaskSection) {
                newTaskSection = document.createElement("div");
                newTaskSection.classList.add("new-task-section");

                // 여러 개의 task-card 추가
                let taskHTML = "";
                for (let i = 1; i <= 10; i++) {  // 10개의 할 일을 생성
                    taskHTML += `
                        <div class="task-card">
                            <div class="task-contents">
                                <h3>Task ${i}</h3>
                                <div class="task-info">
                                    <p>이것은 Task ${i}에 대한 설명입니다.</p>
                                </div>
                                <div class="task-date">
                                    <p>Date: 2025-02-${10 + i}</p>
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
                }

                // 닫기 버튼 추가
                newTaskSection.innerHTML = `
                    <div class="task-list-container">
                        ${taskHTML}
                    </div>
                `;

                main.appendChild(newTaskSection);
            }

            // 슬라이딩 애니메이션 적용 (setTimeout을 사용하여 렌더링 이후 동작)
            setTimeout(() => {
                newTaskSection.classList.add("slide-in");
            }, 10);

            isTaskSectionVisible = true;

            // 닫기 버튼 이벤트 추가
            document.getElementById("close-task-section").addEventListener("click", function () {
                newTaskSection.classList.remove("slide-in");
                isTaskSectionVisible = false;
            });

        } else {
            // 기존 화면으로 돌아오기
            newTaskSection.classList.remove("slide-in");
            isTaskSectionVisible = false;
        }
    });
});
