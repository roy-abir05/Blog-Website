package org.blogger.blogwebsite.model;

import com.fasterxml.jackson.annotation.JsonRawValue;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@Table(name="posts")
@AllArgsConstructor
@NoArgsConstructor
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
    @JsonRawValue
    private String content;

    @ElementCollection
    @Column(name = "up_votes")
    private List<Long> upVotes = new ArrayList<>();
    @ElementCollection
    @Column(name = "down_votes")
    private List<Long> downVotes = new ArrayList<>();

}
