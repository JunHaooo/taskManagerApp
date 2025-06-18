//this whole file is the basic functions any TaskService file should have. so next time can just XX file implements TaskServiceInterface can alr

package com.taskmanager.server.service;

import java.util.List;

import com.taskmanager.server.model.Task;

public interface TaskServiceInterface {
    List<Task> getAllTasks();
    Task saveTask(Task task);
    Task updateTask(Long id, Task task);
    void deleteTask(Long id);
}
