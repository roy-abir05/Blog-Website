package org.blogger.blogwebsite.repositories;

import org.blogger.blogwebsite.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long> {
}
