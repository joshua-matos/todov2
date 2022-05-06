package com.joshuamatos.todopractice1.backend;

import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class ToDoController {

     private final ToDoService service;
     //http://localhost:8080/api/items/
     @GetMapping("/api/items")
     public List<ToDo> getItems(){
        return service.returnAllItems();
     }

     @PostMapping("/api/items")
     public void createToDo(@RequestBody ToDo todo) {
          service.createToDo(todo);
     }

     @PatchMapping("/api/items/{id}")
     public void patchATodo(@RequestBody ToDo todo, @PathVariable Long id)  {
          service.updateItem(todo, id);
     }

     @DeleteMapping("/api/items/{id}")
     public void deleteItem(@PathVariable Long id) {
          service.deleteItem(id);
     }

}
