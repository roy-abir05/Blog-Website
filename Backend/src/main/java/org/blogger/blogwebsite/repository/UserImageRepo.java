package org.blogger.blogwebsite.repository;

import org.blogger.blogwebsite.model.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserImageRepo extends JpaRepository<UserImage, Long> {
    Optional<UserImage> findUserImageByUserId(Long userId);
}
