package com.joshuamatos.todopractice1.backend;

import com.joshuamatos.todopractice1.exception.ApiException;
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
                new ApiException("no task present"));

        if(todo.getContent() != null && todo.getContent().length() > 0) {
            updateToDo.setContent(todo.getContent());
        }
        updateToDo.setCompleted(todo.isCompleted() != updateToDo.isCompleted() || todo.isCompleted());
    }

    //delete item
    public void deleteItem(Long id) {
        if(!repository.existsById(id)) throw new IllegalStateException("Item not here");
        repository.deleteById(id);
    }
}
