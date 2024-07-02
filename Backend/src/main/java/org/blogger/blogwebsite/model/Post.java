package org.blogger.blogwebsite.model;

import com.fasterxml.jackson.annotation.JsonRawValue;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.*;

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
    private Set<Long> upVotes = new HashSet<Long>();
    @ElementCollection
    @Column(name = "down_votes")
    private Set<Long> downVotes = new HashSet<Long>();

}
