package com.ssafy.helpus.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "help_desk")
public class HelpDesk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "help_desk_id")
    private int helpDeskId;

    @Column(name = "category")
    private String category;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "visible")
    private int visible;

    @Column(name = "create_date")
    private LocalDateTime createDate;

    @Column(name = "update_date")
    private LocalDateTime update_date;

    @Column(name = "status")
    private int status;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "helpDesk",cascade = CascadeType.ALL)
    private List<HelpDeskComment> helpDeskComments = new ArrayList<>();

    @OneToMany(mappedBy = "helpDesk",cascade = CascadeType.ALL)
    private List<HelpDeskImage> helpDeskImages = new ArrayList<>();

}
