package com.ssafy.helpus.donation.dto.Confirm;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@ApiModel(value = "후기 목록")
@Getter
@Builder
public class ConfirmListResDto {
    @ApiModelProperty(value = "후기 글 고유번호")
    private Long donationConfirmId;

    @ApiModelProperty(value = "제목")
    private String title;

    @ApiModelProperty(value = "기관명")
    private String name;

    @ApiModelProperty(value = "작성일")
    private LocalDateTime createDate;
}
