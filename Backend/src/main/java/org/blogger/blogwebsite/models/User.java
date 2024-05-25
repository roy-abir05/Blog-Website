package org.blogger.blogwebsite.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

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
    private String bio;

}
