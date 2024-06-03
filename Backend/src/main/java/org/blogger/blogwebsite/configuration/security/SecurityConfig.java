package org.blogger.blogwebsite.configuration.security;

import org.blogger.blogwebsite.service.JpaUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    @Autowired
    private FormLoginSuccessHandler formLoginSuccessHandler;

    private final JpaUserDetailsService jpaUserDetailsService;

    public SecurityConfig(JpaUserDetailsService userDetailsService) {
        this.jpaUserDetailsService = userDetailsService;
    }


    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, JpaUserDetailsService jpaUserDetailsService) throws Exception {

        return http
                .authorizeHttpRequests( auth -> {
                    auth.requestMatchers("/**.css", "/**.png", "/**.jpeg", "/**.jpg", "/**.html").permitAll();
                    auth.requestMatchers("/error").permitAll();
                    auth.requestMatchers("/api/post/addPost").permitAll();
                    auth.requestMatchers(HttpMethod.POST, "/signup").permitAll();
                    auth.anyRequest().authenticated();
                }
                )
                .userDetailsService(jpaUserDetailsService)
                .formLogin(form -> {
                    form.permitAll();
                    form.loginProcessingUrl("/login");
                    form.loginPage("/login.html").usernameParameter("email").passwordParameter("password").successHandler(formLoginSuccessHandler);
                })
                .oauth2Login(oauth2 -> {
                    oauth2.permitAll();
                    oauth2.loginPage("/login.html");
                    oauth2.successHandler(oAuth2LoginSuccessHandler);
                })
                .logout(logout -> {
                    logout.deleteCookies("login", "userId", "name", "email", "imgUrl");
                    logout.logoutSuccessUrl("http://localhost:5173");
                })
                .csrf(csrf -> csrf.disable())
                .build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
}
