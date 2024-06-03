package org.blogger.blogwebsite.controller;

import org.blogger.blogwebsite.model.Post;
import org.blogger.blogwebsite.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/post")
public class PostController {

    @Autowired
    private PostService postService;

    @CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "Content-Type")
    @PostMapping("addPost")
    public Post addPost(@RequestBody Post post) {
        return postService.addPost(post);
    }

    @GetMapping("allPosts")
    public List<Post> allPosts() {
        return postService.getAllPosts();
    }
}
