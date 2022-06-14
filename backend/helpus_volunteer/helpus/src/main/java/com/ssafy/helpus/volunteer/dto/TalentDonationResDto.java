package com.ssafy.helpus.volunteer.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@ApiModel(value = "재능기부 글 조회")
@Getter
@Builder
public class TalentDonationResDto {

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

    @ApiModelProperty(value = "수정일")
    private String name;

    @ApiModelProperty(value = "수정일")
    private String profile;

    @ApiModelProperty(value = "수정일")
    private String userEmail;

    @ApiModelProperty(value = "파일")
    private List<String> images;
}
