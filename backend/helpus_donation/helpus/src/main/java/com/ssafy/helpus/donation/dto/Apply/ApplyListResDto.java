package com.ssafy.helpus.donation.dto.Apply;

import com.ssafy.helpus.donation.enumClass.ApplyStatus;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@ApiModel(value = "기부 목록")
@Getter
@Builder
public class ApplyListResDto {

    private Long donationApplyId;

    private Long donationId;

    private Long memberId;

    private String name;

    private String title;

    @ApiModelProperty(value = "택배사")
    private String parcel;

    @ApiModelProperty(value = "송장 번호")
    private Integer invoice;

    private String productName;

    private int count;

    private LocalDate donationDate;

    private ApplyStatus status;

    private String end;
}
