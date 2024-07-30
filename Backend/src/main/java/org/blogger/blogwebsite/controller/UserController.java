package org.blogger.blogwebsite.controller;

import org.blogger.blogwebsite.model.User;
import org.blogger.blogwebsite.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.LinkedHashMap;
import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("addUser")
    public User addUser(@RequestBody User user) {
        User newUser = userService.addUser(user);
        return newUser;
    }

    @GetMapping("allUsers")
    public String allUsers() {

        List<User> users = userService.getAllUsers();
        return users.toString();
    }

    @GetMapping("get/getUserNameById/{userId}")
    public String getUserName(@PathVariable Long userId) {
        User user = userService.findUserById(userId);
        if(user == null) return "";
        return user.getName();
    }

    @GetMapping("get/getPasswordById/{userId}")
    public String getPasswordById(@PathVariable Long userId) {
        User user = userService.findUserById(userId);
        if(user == null) return "";
        return user.getPassword();
    }

    @GetMapping("get/getUserById/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userService.findUserById(userId);
    }

    @PatchMapping("update/profilePicture/{userId}")
    public void updateProfilePicture(@PathVariable Long userId, @RequestBody String imgUrl) {
       userService.updateUserImage(userId, imgUrl);
    }

    @GetMapping("get/profilePicture/{userId}")
    public String getImgUrl(@PathVariable Long userId) {
        User user = userService.findUserById(userId);
        return user.getImgUrl();
    }

    @PatchMapping("update/userInfo/{userId}")
    public void updateUserInfo(@PathVariable Long userId, @RequestBody LinkedHashMap<String, String> obj) {
        userService.updateUser(userId, obj.get("name"), obj.get("password"));
    }
}
