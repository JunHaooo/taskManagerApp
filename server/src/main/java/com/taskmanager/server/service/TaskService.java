package com.taskmanager.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.server.model.Task;
import com.taskmanager.server.repository.TaskRepository;

@Service
public class TaskService {
    @Autowired
    private TaskRepository repo;

    public List<Task> getAllTasks() {
        return repo.findAll();
    }


    public Task saveTask(Task task) {
        return repo.save(task); // This saves a new task into the database
    }

    public Task updateTask(Long id, Task updatedTask) {
        Task existingTask = repo.findById(id).orElseThrow();
        existingTask.setText(updatedTask.getText());
        existingTask.setDone(updatedTask.isDone());
        return repo.save(existingTask);
    }

    public void deleteTask(Long id) {
        repo.deleteById(id);
    }
}
