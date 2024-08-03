package org.blogger.blogwebsite.configuration.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.blogger.blogwebsite.model.SecurityUser;
import org.blogger.blogwebsite.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class FormLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        SecurityUser securityUser = (SecurityUser) authentication.getPrincipal();

        User user = securityUser.user;

        Cookie loginCookie = new Cookie("login", "Success");
        loginCookie.setPath("/");
        Cookie userIdCookie = new Cookie("userId", String.valueOf(user.getUserId()));
        userIdCookie.setPath("/");
        Cookie nameCookie = new Cookie("name", URLEncoder.encode(user.getName(), StandardCharsets.UTF_8).replaceAll("\\+", "%20"));
        nameCookie.setPath("/");
        Cookie emailCookie = new Cookie("email", user.getEmail());
        emailCookie.setPath("/");
        Cookie imgUrlCookie = new Cookie("imgUrl", user.getImgUrl());
        imgUrlCookie.setPath("/");
        response.addCookie(loginCookie);
        response.addCookie(userIdCookie);
        response.addCookie(nameCookie);
        response.addCookie(emailCookie);
        response.addCookie(imgUrlCookie);

        this.setAlwaysUseDefaultTargetUrl(true);
        this.setDefaultTargetUrl("http://localhost:5173");
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
