package org.blogger.blogwebsite.controller;

import org.blogger.blogwebsite.model.User;
import org.blogger.blogwebsite.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;

@Controller
public class SignUpController {

    private final UserService userService;

    public SignUpController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> SignUp(@ModelAttribute User user) {

        Optional<User> existingUser = userService.findUserByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body("User already exists");
        }
        return ResponseEntity.status(HttpStatus.OK).body(userService.addUser(user));
    }
}
