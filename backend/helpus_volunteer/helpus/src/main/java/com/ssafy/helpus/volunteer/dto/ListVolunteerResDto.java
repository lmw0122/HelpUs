package com.ssafy.helpus.volunteer.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@ApiModel(value = "ListVolunteerResDto : 봉사글 목록")
public class ListVolunteerResDto {
    @ApiModelProperty(value = "제목")
    @Column(name = "volunteer_id")
    private Long volunteerId;

    @ApiModelProperty(value = "제목")
    private String title;

    @ApiModelProperty(value = "회원 id")
    private Long memberId;

    @ApiModelProperty(value = "내용")
    private String content;

    @ApiModelProperty(value = "봉사 날짜")
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime volDate;

    @ApiModelProperty(value = "봉사 주소")
    private String volAddress;

    @ApiModelProperty(value = "봉사 우편번호")
    private int volZipcode;

    @ApiModelProperty(value = "봉사 인원")
    private int people;

    @ApiModelProperty(value = "지원자")
    private int applicant;

    @ApiModelProperty(value = "작성일")
    private LocalDateTime createDate;

    @ApiModelProperty(value = "수정일")
    private LocalDateTime updateDate;

    @ApiModelProperty(value = "퍼센트")
    private double percent;

    @ApiModelProperty(value = "봉사 인원")
    private double time;

    @ApiModelProperty(value = "기관 프로필 사진")
    private String profile;

    @ApiModelProperty(value = "기관명")
    private String name;

    @ApiModelProperty(value = "봉사 참여 여부")
    private int status;

}
