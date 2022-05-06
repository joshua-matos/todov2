package com.joshuamatos.todopractice1.backend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ToDoRepository extends JpaRepository<ToDo, Long> {
  Optional<ToDo> findByContent(String content);
}
