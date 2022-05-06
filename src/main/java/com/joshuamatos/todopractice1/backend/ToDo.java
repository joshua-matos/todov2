package com.joshuamatos.todopractice1.backend;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

import static javax.persistence.GenerationType.*;

@Entity
@Table
public class ToDo {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    private String content;
    private boolean completed;

    public ToDo(Long id, String content, boolean completed) {
        this.id = id;
        this.content = content;
        this.completed = completed;
    }

    public ToDo(String content, boolean completed) {
        this.content = content;
        this.completed = completed;
    }

    public ToDo() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
    @JsonProperty
    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
