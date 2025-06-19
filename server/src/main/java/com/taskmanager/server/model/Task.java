package com.taskmanager.server.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Task {
    @Id //marks id as the primary key in the table
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto-generates the value when saving new tasks
    private Long id;
 
    @NotBlank(message = "Task text must not be empty.") //tells springboot to validate this field; it must not be null or just whitespace
    private String text;

    private boolean done; //defining the type

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    //Constructors 
    public Task() {} //no-argument constructor in order to create an empty task

    public Task(Long id, String text, boolean done) {
        this.id = id;
        this.text = text;
        this.done = done;
    }
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id){ this.id = id; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public boolean isDone() { return done; }
    public void setDone(boolean done) { this.done = done; }

    public List<Comment> getComments() { return comments; }

    public void setComments(List<Comment> comments) { this.comments = comments; }
}