package com.joshuamatos.todopractice1.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ToDoConfiguration {

    @Bean
    CommandLineRunner commandLineRunner(ToDoRepository todoRepository){
        return args -> {
            ToDo todo = new ToDo("This task I am putting in here will never be done", false);
            todoRepository.save(todo);
        };
    }
}
