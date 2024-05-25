package org.blogger.blogwebsite.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name="posts")
public class Post {

    @Id
    @GeneratedValue
    private Long postId;
    private Long userId;
    private String title;
    private String dateAndTime;
    private String content;
    private Integer upVote;
    private Integer downVote;
    private String category;

}
