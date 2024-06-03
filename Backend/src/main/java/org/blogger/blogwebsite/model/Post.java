package org.blogger.blogwebsite.model;

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

    @Column(columnDefinition = "text")
    private String content;
    private Long upVote;
    private Long downVote;
    private String category;

}
