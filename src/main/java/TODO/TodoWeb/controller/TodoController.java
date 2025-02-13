package TODO.TodoWeb.controller;


import TODO.TodoWeb.entity.checkList;
import TODO.TodoWeb.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/todo")
public class TodoController {

    private final TodoService todoService;


    @GetMapping("/today")
    public List<checkList> getTodayTasks() {
        LocalDate today = LocalDate.now(); // 현재 날짜 가져오기
        return this.todoService.getTodayList(today);
    }

    @PostMapping("/add")
    public checkList addTask(@RequestBody checkList newTask) {
        System.out.println("📥 새 작업 추가 요청: " + newTask.getTitle() + " | " + newTask.getStartDate());
        return this.todoService.saveTask(newTask);
    }
}
