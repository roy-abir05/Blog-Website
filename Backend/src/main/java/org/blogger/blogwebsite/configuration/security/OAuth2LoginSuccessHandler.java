package org.blogger.blogwebsite.configuration.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.blogger.blogwebsite.model.User;
import org.blogger.blogwebsite.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

@Component
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Autowired
    private UserService userService;

    public OAuth2LoginSuccessHandler(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = principal.getAttributes();
        String name = principal.getAttribute("given_name").toString();
        String email = principal.getAttribute("email").toString();
        String imgUrl = principal.getAttribute("picture").toString();

        userService.findUserByEmail(email)
                .ifPresentOrElse(ignore -> {
                }, () -> {
                    User user = new User();
                    user.setName(name);
                    user.setEmail(email);
                    user.setImgUrl(imgUrl);

                    userService.addUser(user);

                });
        Cookie loginCookie = new Cookie("login", "Success");
        loginCookie.setPath("/");
        response.addCookie(loginCookie);
        userService.findUserByEmail(email)
                .ifPresentOrElse(user -> {
                    Cookie userIdCookie = new Cookie("userId", String.valueOf(user.getUserId()));
                    userIdCookie.setPath("/");
                    response.addCookie(userIdCookie);
                }, () -> {});
        Cookie nameCookie = new Cookie("name", name);
        nameCookie.setPath("/");
        Cookie emailCookie = new Cookie("email", email);
        emailCookie.setPath("/");
        Cookie imgUrlCookie = new Cookie("imgUrl", imgUrl);
        imgUrlCookie.setPath("/");
        response.addCookie(nameCookie);
        response.addCookie(emailCookie);
        response.addCookie(imgUrlCookie);
//        cookie.setHttpOnly(true);
//        cookie.setSecure(false);
//        cookie.setDomain("localhost");

        this.setAlwaysUseDefaultTargetUrl(true);
        this.setDefaultTargetUrl("http://localhost:5173");
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
