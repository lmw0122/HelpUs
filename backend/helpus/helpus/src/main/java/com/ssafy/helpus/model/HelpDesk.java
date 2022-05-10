package com.ssafy.helpus.model;

import com.ssafy.helpus.config.enumClass.DeskCategory;
import lombok.Builder;
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
    @Column(name = "help_desk_id", insertable = false, updatable = false)
    private Long helpDeskId;

    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private DeskCategory category;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "visible")
    private String visible;

    @Column(name = "create_date", insertable = false, updatable = false)
    private LocalDateTime createDate;

    @Column(name = "update_date", insertable = false)
    private LocalDateTime updateDate;

    @Column(name = "status", insertable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "member_id", updatable = false)
    private Member member;

    @OneToMany(mappedBy = "helpDesk", cascade = CascadeType.ALL)
    private List<HelpDeskComment> helpDeskComments = new ArrayList<>();

    @OneToMany(mappedBy = "helpDesk", cascade = CascadeType.ALL)
    private List<HelpDeskImage> helpDeskImages = new ArrayList<>();

    @Builder
    public HelpDesk(DeskCategory category, String title, String content, Member member, String visible) {
        this.category = category;
        this.title = title;
        this.content = content;
        this.member = member;
        this.visible = visible;
    }
}
