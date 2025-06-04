package com.taskmanager.server.repository;

import com.taskmanager.server.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // no need to define anything unless you want custom methods
}