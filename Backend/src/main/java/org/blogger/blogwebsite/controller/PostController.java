package org.blogger.blogwebsite.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.blogger.blogwebsite.model.Post;
import org.blogger.blogwebsite.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.OffsetDateTime;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
@RequestMapping("api/posts")
public class PostController {

    @Autowired
    private PostService postService;
    @Autowired
    private HttpServletResponse httpServletResponse;

    @PostMapping("post/addPost")
    public Post addPost(@RequestBody LinkedHashMap<?, ?> obj) throws JsonProcessingException {

//        System.out.println(obj.getClass().getName());
        ObjectMapper mapper = new ObjectMapper();
        Post post = new Post();
//        System.out.println(obj.get("userId"));
        {
            String utcDateString = "2024-06-20T12:21:00.000Z";
            DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME; // Predefined format for UTC
            OffsetDateTime utcDateTime = OffsetDateTime.parse(utcDateString, formatter);
            System.out.println(utcDateTime);
            OffsetDateTime utcDateTimeInUTC = utcDateTime.withOffsetSameInstant(ZoneOffset.UTC);
            Instant instant = utcDateTimeInUTC.toInstant();
            System.out.println(instant.toString());
            Date date = Date.from(instant);
            System.out.println(date);
            System.out.println(utcDateString + " -> " + utcDateTime);
        }
        post.setUserId(Long.parseLong((String) obj.get("userId")));
        post.setUserName((String) obj.get("userName"));
        post.setTitle((String) obj.get("title"));
        post.setCreatedDate(Date.from(OffsetDateTime.parse((String) obj.get("createdDate"), DateTimeFormatter.ISO_OFFSET_DATE_TIME).toInstant()));
        post.setUpdatedDate(Date.from(OffsetDateTime.parse((String) obj.get("updatedDate"), DateTimeFormatter.ISO_OFFSET_DATE_TIME).toInstant()));
        post.setContent(mapper.writeValueAsString(obj.get("content")));
//        post.setUpVote(Long.parseLong((String) obj.get("upVote")));
//        post.setDownVote(Long.parseLong((String) obj.get("downVote")));

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
    public Post viewPost(@PathVariable(name = "postId") Long postId){
        return postService.getPostbyId(postId);
    }

    @PutMapping("put/addUpVote")
    public Post addUpVote(@RequestBody LinkedHashMap<String, Long> obj){
        return postService.addUpVote(obj.get("postId"), obj.get("userId"));
    }

    @PutMapping("put/removeUpVote")
    public Post removeUpVote(@RequestBody LinkedHashMap<String, Long> obj){
        return postService.removeUpVote(obj.get("postId"), obj.get("userId"));
    }

    @PutMapping("put/addDownVote")
    public Post addDownVote(@RequestBody LinkedHashMap<String, Long> obj){
        return postService.addDownVote(obj.get("postId"), obj.get("userId"));
    }

    @PutMapping("put/removeDownVote")
    public Post removeDownVote(@RequestBody LinkedHashMap<String, Long> obj){
        return postService.removeDownVote(obj.get("postId"), obj.get("userId"));
    }
}