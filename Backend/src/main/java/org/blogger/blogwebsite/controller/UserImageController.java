package org.blogger.blogwebsite.controller;

import org.blogger.blogwebsite.model.UserImage;
import org.blogger.blogwebsite.service.UserImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;

@Controller
@RequestMapping("api/userImage")
public class UserImageController {

    @Autowired
    private UserImageService userImageService;

    @PostMapping("post/addUserImage")
    public ResponseEntity<?> uploadImage(@RequestParam("userId") Long userId, @RequestParam("image") MultipartFile file) throws IOException {

        UserImage userImage = new UserImage(userId, file.getBytes());

        userImageService.addUserImage(userImage);
        return ResponseEntity.status(HttpStatus.OK)
                .body(userImage);
    }

    @GetMapping("get/userImageByUserId/{userId}")
    public ResponseEntity<?> getUserImageByUserId(@PathVariable Long userId) throws IOException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(userImageService.getImageByUserId(userId));
    }
}
