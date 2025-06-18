package com.taskmanager.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.server.exception.TaskNotFoundException;
import com.taskmanager.server.model.Task;
import com.taskmanager.server.repository.TaskRepository;

@Service
public class TaskService implements TaskServiceInterface{
    @Autowired
    private TaskRepository repo;

    @Override
    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    @Override
    public Task saveTask(Task task) {
        return repo.save(task); // This saves a new task into the database
    }

    @Override
    public Task updateTask(Long id, Task updatedTask) {
        Task task = repo.findById(id)
            .orElseThrow(() -> new TaskNotFoundException(id));
    
        task.setText(updatedTask.getText());
        task.setDone(updatedTask.isDone());
        return repo.save(task);
    }

    @Override
    public void deleteTask(Long id) {
        if (!repo.existsById(id)) {
            throw new TaskNotFoundException(id);
        }
        
        repo.deleteById(id);
    }
}
