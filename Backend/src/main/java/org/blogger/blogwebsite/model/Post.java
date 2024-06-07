package org.blogger.blogwebsite.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;
import java.util.Date;

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
    private String userName;
    private String title;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedDate;

    @Column(columnDefinition = "text")
    private String content;
    private Long upVote;
    private Long downVote;

}
