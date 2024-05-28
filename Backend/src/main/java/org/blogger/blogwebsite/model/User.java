package org.blogger.blogwebsite.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name="users")
public class User {

    @Id
    @GeneratedValue
    private Long userId;
    private String name;
    private String email;
    private String password;
    private String imgUrl;
}
