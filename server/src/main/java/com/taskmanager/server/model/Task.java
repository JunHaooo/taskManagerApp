package com.taskmanager.server.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;
    private boolean done; //defining the type

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
}