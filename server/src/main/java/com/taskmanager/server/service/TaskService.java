package com.taskmanager.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.server.model.Task;
import com.taskmanager.server.repository.TaskRepository;
import com.taskmanager.server.exception.TaskNotFoundException;

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
        Task task = repo.findById(id)
            .orElseThrow(() -> new TaskNotFoundException(id));
    
        task.setText(updatedTask.getText());
        task.setDone(updatedTask.isDone());
        return repo.save(task);
    }

    public void deleteTask(Long id) {
        if (!repo.existsById(id)) {
            throw new TaskNotFoundException(id);
        }
        
        repo.deleteById(id);
    }
}
