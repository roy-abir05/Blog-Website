package org.blogger.blogwebsite.service;

import jakarta.transaction.Transactional;
import org.blogger.blogwebsite.model.UserImage;
import org.blogger.blogwebsite.repository.UserImageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserImageService {

    @Autowired
    private UserImageRepo userImageRepo;

    public UserImage addUserImage(UserImage userImage) {
        return userImageRepo.save(userImage);
    }

    public byte[] getImage(Long userImageId) {
        Optional<UserImage> userImage = userImageRepo.findById(userImageId);
        return userImage.get().getImageData();
    }

    @Transactional
    public byte[] getImageByUserId(Long userId) {
        Optional<UserImage> userImage = userImageRepo.findUserImageByUserId(userId);

        if(!userImage.isPresent()) return new byte[0];

        return userImage.get().getImageData();
    }
}
