package com.ssafy.helpus.volunteer.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@ApiModel(value = "ListTalentDonationResDto : 재능기부 글 목록")
public class ListTalentDonationResDto {
    @ApiModelProperty(value = "제목")
    @Column(name = "volunteer_id")
    private Long volunteerId;

    @ApiModelProperty(value = "제목")
    private String title;

    @ApiModelProperty(value = "회원 id")
    private Long memberId;

    @ApiModelProperty(value = "내용")
    private String content;

    @ApiModelProperty(value = "작성일")
    private LocalDateTime createDate;

    @ApiModelProperty(value = "수정일")
    private LocalDateTime updateDate;

    @ApiModelProperty(value = "기관 프로필 사진")
    private String profile;

    @ApiModelProperty(value = "기관명")
    private String name;

    @ApiModelProperty(value = "게시글 번호")
    private int no;

}
