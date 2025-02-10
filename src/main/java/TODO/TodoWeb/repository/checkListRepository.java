package TODO.TodoWeb.repository;

import TODO.TodoWeb.entity.checkList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface checkListRepository extends JpaRepository<checkList, Long> {
    List<checkList> findByStartDate(LocalDateTime startDate);
}
