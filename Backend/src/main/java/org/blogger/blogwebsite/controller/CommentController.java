package org.blogger.blogwebsite.controller;

import org.blogger.blogwebsite.model.Comment;
import org.blogger.blogwebsite.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("post/addComment")
    public Comment addComment(@RequestBody Comment comment) {
        return commentService.addComment(comment);
    }

    @GetMapping("allComments")
    public List<Comment> allComments() {
        return commentService.getAllComments();
    }

    @GetMapping("get/postComments/{postId}")
    public List<Comment> getPostComments(@PathVariable long postId) { return commentService.getCommentsByPostId(postId); }
}
