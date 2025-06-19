package com.taskmanager.server.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;


@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Task text must not be empty.") //tells springboot to validate this field; it must not be null or just whitespace
    private String text;    

    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;

    //Constructors 
    public Comment() {} //no-argument constructor in order to create an empty task

    public Comment(Long id, String text, LocalDateTime timestamp, Task task) {
        this.id = id;
        this.text = text;
        this.timestamp = timestamp;
        this.task = task;
    }
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id){ this.id = id; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public LocalDateTime getTimeStamp() { return timestamp; }
    public void setTimeStamp(LocalDateTime timestamp) { this.timestamp = timestamp;}

    public Task getTask() { return task; }

    public void setTask(Task task) { this.task = task; }
}