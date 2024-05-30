package org.blogger.blogwebsite.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name="users")
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue
    private Long userId;
    private String name;
    private String email;
    private String password;
    private String imgUrl;
}
