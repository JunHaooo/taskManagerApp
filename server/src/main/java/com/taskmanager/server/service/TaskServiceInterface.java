package com.taskmanager.server.service;

import com.taskmanager.server.model.Task;

import java.util.List;

public interface TaskServiceInterface {
    List<Task> getAllTasks();
    Task saveTask(Task task);
    Task updateTask(Long id, Task task);
    void deleteTask(Long id);
}
