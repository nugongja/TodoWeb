package TODO.TodoWeb.service;

import TODO.TodoWeb.entity.checkList;
import TODO.TodoWeb.repository.TodoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        return todoRepository.findAll().stream()
                .filter(task -> task.getStartDate().toLocalDate().equals(today))
                .collect(Collectors.toList());
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
