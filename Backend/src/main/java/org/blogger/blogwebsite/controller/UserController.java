package org.blogger.blogwebsite.controller;

import org.blogger.blogwebsite.model.User;
import org.blogger.blogwebsite.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
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
    }

    @GetMapping("user")
    public String getUserName(@RequestBody Long userId) {
        User user = userService.findUserById(userId);
        if(user == null) return "";

        return user.getName();
    }
}
