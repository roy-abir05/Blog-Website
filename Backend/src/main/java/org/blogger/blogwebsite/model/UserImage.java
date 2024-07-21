package org.blogger.blogwebsite.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserImage {

    @Id
    @GeneratedValue
    private Long userImageId;
    
    private Long userId;

    @Lob
    @Column(name = "imagedata", length = 1000)
    private byte[] imageData;

    public UserImage(Long userId, byte[] imageData) {
        this.userId = userId;
        this.imageData = imageData;
    }
}
