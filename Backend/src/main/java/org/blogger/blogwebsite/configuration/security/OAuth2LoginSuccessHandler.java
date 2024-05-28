package org.blogger.blogwebsite.configuration.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.blogger.blogwebsite.models.User;
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
                .ifPresentOrElse(user -> {
                    System.out.println("User already registerd");
                }, () -> {
                    User user = new User();
                    user.setName(name);
                    user.setEmail(email);
                    user.setImgUrl(imgUrl);

                    userService.addUser(user);
                });

        Cookie cookie = new Cookie("login", "Success");
        cookie.setPath("/");
//        cookie.setHttpOnly(true);
//        cookie.setSecure(false);
//        cookie.setDomain("localhost");
        response.addCookie(cookie);

        this.setAlwaysUseDefaultTargetUrl(true);
        this.setDefaultTargetUrl("http://localhost:5173");
//        this.setDefaultTargetUrl("http://localhost:8080/login/success");
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
