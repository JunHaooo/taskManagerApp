package com.taskmanager.server.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.server.model.Comment;
import com.taskmanager.server.model.Task;
import com.taskmanager.server.repository.CommentRepository;
import com.taskmanager.server.repository.TaskRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepo;

    @Autowired
    private TaskRepository taskRepo;

    public List<Comment> getCommentsByTaskId(Long taskId) {
        return commentRepo.findByTaskId(taskId);
    }

    public Comment addComment(Long taskId, String text) {
        Task task = taskRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        Comment comment = new Comment();
        comment.setText(text);
        comment.setTimeStamp(LocalDateTime.now());
        comment.setTask(task);

        return commentRepo.save(comment);
    }
}
