package com.ssafy.helpus.donation.dto.Donation;

import com.ssafy.helpus.donation.dto.Donation.DonationProductReqDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@ApiModel(value = "물품 기부 글 등록")
@Getter
public class DonationReqDto {
    @ApiModelProperty(value = "제목")
    @NotBlank(message = "제목을 입력해주세요")
    private String title;

    @ApiModelProperty(value = "회원 고유 번호")
    @NotNull
    private Integer memberId;

    @ApiModelProperty(value = "내용")
    @NotBlank(message = "내용을 입력해주세요")
    private String content;

    @ApiModelProperty(value = "종료일")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @ApiModelProperty(value = "기부 물품")
    private List<DonationProductReqDto> products;
}
