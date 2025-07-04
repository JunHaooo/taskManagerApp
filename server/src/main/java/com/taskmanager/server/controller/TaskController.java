package com.taskmanager.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.server.model.Task;
import com.taskmanager.server.service.TaskServiceInterface;

import jakarta.validation.Valid; // if applicable

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private TaskServiceInterface service;

    /// syntax
    ///public ReturnType methodName(ParameterList) {method logic
    /// return something; }
    /// ReturnType is void if you dont need to return anyth

    //Get all tasks
    @GetMapping
    public List<Task> getTasks() {
        return service.getAllTasks();
    }

    //POST a new task
    @PostMapping
    public Task createTask(@Valid @RequestBody Task task) {
        return service.saveTask(task);
    }

    //PUT (update) a task - toggle done
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        return service.updateTask(id, updatedTask);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        service.deleteTask(id);
    }
}