package org.blogger.blogwebsite.controller;

import org.blogger.blogwebsite.model.Post;
import org.blogger.blogwebsite.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "Content-Type")
@RequestMapping("api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("post/addPost")
    public Post addPost(@RequestBody Post post) {
        return postService.addPost(post);
    }

    @GetMapping("get/allPosts")
    public List<Post> allPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("get/userPosts/{userId}")
    public List<Post> getUserPosts(@PathVariable(name = "userId") Long userId) {
        return postService.getPostsByUserId(userId);
    }

    @GetMapping("get/getPost/{postId}")
    public String viewPost(@PathVariable(name = "postId") Long postId){
        return postService.getPostbyId(postId).getContent();
    }
}