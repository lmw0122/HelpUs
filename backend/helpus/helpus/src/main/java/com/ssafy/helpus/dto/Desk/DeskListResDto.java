package com.ssafy.helpus.dto.Desk;

import com.ssafy.helpus.config.enumClass.DeskCategory;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@ApiModel(value = "고객센터 목록")
@Getter @Builder
public class DeskListResDto {

    @ApiModelProperty(value = "고객센터 글 고유번호")
    private Long helpDeskId;

    @ApiModelProperty(value = "카테고리", example = "문의, 정보수정, 신고, 도움")
    private DeskCategory category;

    @ApiModelProperty(value = "제목")
    private String title;

    @ApiModelProperty(value = "작성자 고유 번호")
    private int memberId;

    @ApiModelProperty(value = "작성자 이름")
    private String name;

    @ApiModelProperty(value = "작성일")
    private LocalDateTime createDate;

    @ApiModelProperty(value = "공개여부", example = "공개 or 비공개")
    private String visible;

    @ApiModelProperty(value = "답변 등록 여부")
    private String status;
}
