package TODO.TodoWeb.controller;


import TODO.TodoWeb.entity.checkList;
import TODO.TodoWeb.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
