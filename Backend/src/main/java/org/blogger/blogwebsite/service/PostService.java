package org.blogger.blogwebsite.service;

import org.blogger.blogwebsite.models.Post;
import org.blogger.blogwebsite.repositories.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepo postRepo;

    public List<Post> getAllPosts() {
        return postRepo.findAll();
    }

    public Post addPost(Post post) {
        return postRepo.save(post);
    }
}
