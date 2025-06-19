package com.taskmanager.server.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.taskmanager.server.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // no need to define anything unless you want custom methods
}

