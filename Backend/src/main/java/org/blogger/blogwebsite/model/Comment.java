package org.blogger.blogwebsite.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Entity
@Getter
@Setter
@ToString
@Table(name="comments")
public class Comment {

    @Id
    @GeneratedValue
    private Long commentId;
    private Long postId;
    private Long userId;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateAndTime;
    private String content;
}
