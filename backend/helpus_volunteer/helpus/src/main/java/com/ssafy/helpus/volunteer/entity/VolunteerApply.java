package com.ssafy.helpus.volunteer.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "volunteer_apply")
public class VolunteerApply {

    @Id
    @Column(name = "volunteer_apply_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long applyId;

    @ManyToOne
    @JoinColumn(name = "volunteer_id", nullable = false)
    private Volunteer volunteer;

    @Column(name = "member_id", nullable = false, updatable = false)
    private Long memberId;

    @Column
    private  int status;

    @Column(name = "write_id", nullable = false, updatable = false)
    private Long writeId;

    @Builder
    public VolunteerApply(Volunteer volunteer, Long memberId, int status, Long writeId){
        this.volunteer = volunteer;
        this.memberId = memberId;
        this.status = status;
        this.writeId = writeId;
    }

}
