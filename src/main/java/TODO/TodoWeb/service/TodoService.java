package TODO.TodoWeb.service;

import TODO.TodoWeb.entity.checkList;
import TODO.TodoWeb.repository.TodoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@AllArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;

    public List<checkList> getTodayList(LocalDate today) {
        LocalDateTime startOfDay = today.atStartOfDay(); // 00:00:00
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX); // 23:59:59

        return this.todoRepository.findByStartDate(startOfDay, endOfDay);
    }

}
