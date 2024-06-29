package org.blogger.blogwebsite.service;

import org.blogger.blogwebsite.model.Post;
import org.blogger.blogwebsite.repository.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public List<Post> getPostsByUserId(Long userId) { return postRepo.findAllByUserId(userId); }

    public Post getPostbyId(Long postId) { return postRepo.findById(postId).orElse(null); }

    public Post addUpVote(Long postId, Long userId) {
        Post post = getPostbyId(postId);
        post.getUpVotes().add(userId);
        return postRepo.save(post);
    }

    public Post removeUpVote(Long postId, Long userId) {
        Post post = getPostbyId(postId);
        post.getUpVotes().remove(userId);
        return postRepo.save(post);
    }

    public Post addDownVote(Long postId, Long userId) {
        Post post = getPostbyId(postId);
        post.getDownVotes().add(userId);
        return postRepo.save(post);
    }

    public Post removeDownVote(Long postId, Long userId) {
        Post post = getPostbyId(postId);
        post.getDownVotes().remove(userId);
        return postRepo.save(post);
    }
}
