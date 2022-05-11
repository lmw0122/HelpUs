package com.ssafy.helpus.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "help_desk_image")
public class HelpDeskImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "help_desk_image_id")
    private Long HelpDeskCommentId;

    @Column(name = "url")
    private String url;

    @ManyToOne
    @JoinColumn(name = "help_desk_id")
    private HelpDesk helpDesk;

    @Builder
    public HelpDeskImage(String url, HelpDesk helpDesk) {
        this.url = url;
        this.helpDesk = helpDesk;
    }
}