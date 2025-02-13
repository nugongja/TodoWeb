package TODO.TodoWeb.repository;

import TODO.TodoWeb.entity.checkList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface TodoRepository extends JpaRepository<checkList, Long> {
    @Query("SELECT t FROM checkList t WHERE t.startDate BETWEEN :startOfDay AND :endOfDay")
    List<checkList> findByStartDate(
            @Param("startOfDay") LocalDateTime startOfDay,
            @Param("endOfDay") LocalDateTime endOfDay
    );

    List<checkList> findByCheckedTrue();

    List<checkList> findByCheckedFalse();
}
