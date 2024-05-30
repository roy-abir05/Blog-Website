package org.blogger.blogwebsite.controller;

import org.blogger.blogwebsite.model.User;
import org.blogger.blogwebsite.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.concurrent.atomic.AtomicBoolean;

@Controller
public class SignUpController {

    private final UserService userService;

    public SignUpController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    @ResponseBody
    public String SignUp(@ModelAttribute User user) {

        AtomicBoolean doesUserExist = new AtomicBoolean(false);

        userService.findUserByEmail(user.getEmail()).ifPresentOrElse(existingUser -> {
            doesUserExist.set(true);
        }, () -> {
            if("".equals(user.getImgUrl()))
                user.setImgUrl(null);

            userService.addUser(user);
        });


        if(doesUserExist.get())
            return "User Already Exists";
        else
            return "Success";
    }
}
