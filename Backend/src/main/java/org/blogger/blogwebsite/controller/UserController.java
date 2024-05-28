package org.blogger.blogwebsite.controller;

import org.blogger.blogwebsite.model.User;
import org.blogger.blogwebsite.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("addUser")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping("allUsers")
    public String allUsers() {

        List<User> users = userService.getAllUsers();
        return users.toString();
//        return "hello";
    }

}
