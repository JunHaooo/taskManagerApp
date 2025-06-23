package com.taskmanager.server.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.server.model.Comment;
import com.taskmanager.server.service.CommentService;


@RestController
@RequestMapping("/tasks/{taskId}/comments")
@CrossOrigin(origins = "http://localhost:5173") // or 5173
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping
    public List<Comment> getComments(@PathVariable Long taskId) {
        return commentService.getCommentsByTaskId(taskId);
    }

    @PostMapping
    public Comment addComment(@PathVariable Long taskId, @RequestBody Map<String, String> body) {
        String text = body.get("text");
        return commentService.addComment(taskId, text);
    }
}
