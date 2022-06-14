package com.ssafy.helpus.donation.dto.Confirm;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@ApiModel(value = "후기 글 조회")
@Getter
@Builder
public class ConfirmResDto {
    @ApiModelProperty(value = "기부 글 고유 번호")
    private Long donationId;

    @ApiModelProperty(value = "제목")
    private String title;

    @ApiModelProperty(value = "회원 고유 번호")
    private Long memberId;

    @ApiModelProperty(value = "내용")
    private String content;

    @ApiModelProperty(value = "작성일")
    private LocalDateTime createDate;

    @ApiModelProperty(value = "수정일")
    private LocalDateTime updateDate;

    @ApiModelProperty(value = "파일")
    private List<String> images;

}
