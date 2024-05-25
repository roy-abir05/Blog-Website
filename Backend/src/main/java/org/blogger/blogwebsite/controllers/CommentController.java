package org.blogger.blogwebsite.controllers;

import org.blogger.blogwebsite.models.Comment;
import org.blogger.blogwebsite.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("addComment")
    public Comment addComment(@RequestBody Comment comment) {
        return commentService.addComment(comment);
    }

    @GetMapping("allComments")
    public List<Comment> allComments() {
        return commentService.getAllComments();
    }
}
