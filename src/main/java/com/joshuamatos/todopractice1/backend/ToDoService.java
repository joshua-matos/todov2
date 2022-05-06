package com.joshuamatos.todopractice1.backend;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@AllArgsConstructor
public class ToDoService {

    private final ToDoRepository repository;

    //Return all Items from repository
    public List<ToDo> returnAllItems() {
        return repository.findAll();
    }

    //Create item
    public void createToDo(ToDo todo) {
        //Ensure the data passed in is ONLY getContent and isCompleted
        ToDo saveToDo = new ToDo(todo.getContent(), todo.isCompleted());
        if(todo.getContent() != null){
            repository.save(todo);
        }
    }

    //Update item
    @Transactional
    public void updateItem(ToDo todo, Long id) {
        ToDo updateToDo = repository
                .findById(
                       id)
                .orElseThrow(() ->
                new IllegalStateException("no task present"));

        if(todo.getContent() != null && todo.getContent().length() > 0) {
            updateToDo.setContent(todo.getContent());
        }

        if(todo.isCompleted() != updateToDo.isCompleted() && todo.isCompleted() == false) {
            updateToDo.setCompleted(false);
        } else {
            updateToDo.setCompleted(true);
        }
    }

    //delete item
    public void deleteItem(Long id) {
        if(!repository.existsById(id)) throw new IllegalStateException("Item not here");
        repository.deleteById(id);
    }
}
