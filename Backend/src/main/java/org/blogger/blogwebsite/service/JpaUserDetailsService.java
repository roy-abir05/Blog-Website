package org.blogger.blogwebsite.service;

import org.blogger.blogwebsite.model.SecurityUser;
import org.blogger.blogwebsite.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    private final UserService userService;

    public JpaUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findUserByEmail(username).orElse(new User());
        System.out.println(user.toString());
        return userService
                .findUserByEmail(username)
                .map(SecurityUser::new)
                .orElseThrow(() -> new UsernameNotFoundException("Email not found: " + username));
    }

}
