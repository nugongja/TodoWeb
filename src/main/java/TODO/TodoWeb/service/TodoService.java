package TODO.TodoWeb.service;

import TODO.TodoWeb.entity.checkList;
import TODO.TodoWeb.repository.TodoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;

    public checkList getTask(Long id){
        Optional<checkList> task = this.todoRepository.findById(id);
        if(task.isPresent()){
            return task.get();
        }
        return null;
    }

    public List<checkList> getTodayList(LocalDate today) {
        LocalDateTime startOfDay = today.atStartOfDay(); // 00:00:00
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX); // 23:59:59

        return this.todoRepository.findByStartDate(startOfDay, endOfDay);
    }

    public checkList saveTask(checkList newTask) {
        return this.todoRepository.save(newTask);
    }

    public Integer getCompletedTasks(){
        List<checkList> list = this.todoRepository.findByCheckedTrue();
        return list.size();
    }

    public Integer getPendingTasks(){
        List<checkList> list = this.todoRepository.findByCheckedFalse();
        return list.size();
    }

    public boolean deleteById(Long id) {
        Optional<checkList> task = this.todoRepository.findById(id);
        if(task.isPresent()){
            this.todoRepository.delete(task.get());
            return true;
        }
        return false;
    }
}
