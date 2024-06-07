package org.blogger.blogwebsite.repository;

import org.blogger.blogwebsite.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {

    public List<Post> findAllByUserId(Long userId);
}
