package TODO.TodoWeb.controller;


import TODO.TodoWeb.entity.checkList;
import TODO.TodoWeb.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    @GetMapping("/date")
    public ResponseEntity<?> getTasksByDate(@RequestParam("date") String date){
        try{
            LocalDate localDate = LocalDate.parse(date);
            List<checkList> tasks = this.todoService.getTodayList(localDate);
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid date format. Use YYYY-MM-DD.");
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addTask(@RequestBody checkList newTask) {
        try{
            if (newTask.getStartDate() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Start date is required.");
            }

            LocalDateTime taskDateTime = newTask.getStartDate();
            newTask.setStartDate(taskDateTime);

            checkList savedTask = this.todoService.saveTask(newTask);
            return ResponseEntity.ok(savedTask);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid date format. Use YYYY-MM-DD.");
        }
    }

    @GetMapping("/getTasksCount")
    public List<Integer> getTasksCount(){
        Integer completed = this.todoService.getCompletedTasks();
        Integer pending = this.todoService.getPendingTasks();
        Integer total = completed + pending;

        return List.of(completed, pending, total);
    }

    @PostMapping("/taskComplete/{id}")
    public ResponseEntity<String> toogleTaskComplete(@PathVariable("id") Long id){
        checkList task = this.todoService.getTask(id);
        if(task == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
        }

        task.setChecked(!task.isChecked());
        this.todoService.saveTask(task);
        return ResponseEntity.ok("Task completed toggled");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable("id") Long id){
        boolean isDeleted = this.todoService.deleteById(id);
        if(isDeleted){
            return ResponseEntity.ok("Task deleted successfully");
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
        }
    }
}
