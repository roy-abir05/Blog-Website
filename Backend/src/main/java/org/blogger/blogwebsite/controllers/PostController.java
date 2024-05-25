package org.blogger.blogwebsite.controllers;

import org.blogger.blogwebsite.models.Post;
import org.blogger.blogwebsite.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("post")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("addPost")
    public Post addPost(@RequestBody Post post) {
        return postService.addPost(post);
    }

    @GetMapping("allPosts")
    public List<Post> allPosts() {
        return postService.getAllPosts();
    }
}
