package org.blogger.blogwebsite.service;

import jakarta.transaction.Transactional;
import org.blogger.blogwebsite.model.User;
import org.blogger.blogwebsite.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public Optional<User> findUserByEmail(String email) {return userRepo.findByEmail(email);}

    public User addUser(User user) {
        return userRepo.save(user);
    }

    public User findUserById(Long id) {
        return userRepo.findById(id).orElse(null);
    }

    @Transactional
    public User updateUserImage(Long userId, String imageUrl) {
        User user = userRepo.findById(userId).orElse(null);
        if(user == null) {
            return null;
        }

        user.setImgUrl(imageUrl);
        return userRepo.save(user);
    }

    @Transactional
    public User updateUser(Long userId, String name, String password) {
        User user = userRepo.findById(userId).orElse(null);
        if(user == null) {
            return null;
        }

        user.setName(name);
        user.setPassword(password);
        return userRepo.save(user);
    }
}
