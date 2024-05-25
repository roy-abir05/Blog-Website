package org.blogger.blogwebsite.service;

import org.blogger.blogwebsite.models.Comment;
import org.blogger.blogwebsite.repositories.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepo commentRepo;

    public List<Comment> getAllComments() {
        return commentRepo.findAll();
    }

    public Comment addComment(Comment comment) {
        return commentRepo.save(comment);
    }
}
