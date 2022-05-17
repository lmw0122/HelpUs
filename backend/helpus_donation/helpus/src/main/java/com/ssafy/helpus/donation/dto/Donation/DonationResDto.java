package com.ssafy.helpus.donation.dto.Donation;

import com.ssafy.helpus.donation.enumClass.DonationStatus;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@ApiModel(value = "물품 기부 글 조회")
@Getter
@Builder
public class DonationResDto {
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

    @ApiModelProperty(value = "종료일")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @ApiModelProperty(value = "파일")
    private List<String> images;

    @ApiModelProperty(value = "기부 물품")
    private List<DonationProductResDto> products;

    private DonationStatus status;
}
