package com.ssafy.helpus.dto.Desk;

import com.ssafy.helpus.config.enumClass.DeskCategory;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@ApiModel(value = "고객센터 게시글")
@Getter @Builder
public class DeskResDto {
    @ApiModelProperty(value = "작성자 고유 번호")
    private int memberId;

    @ApiModelProperty(value = "작성자 이름")
    private String name;

    @ApiModelProperty(value = "작성자 프로필")
    private String profile;

    @ApiModelProperty(value = "카테고리", example = "문의, 정보수정, 신고, 도움")
    @NotBlank(message = "카테고리를 선택해주세요")
    private DeskCategory category;

    @ApiModelProperty(value = "제목")
    @NotBlank(message = "제목을 입력해주세요")
    private String title;

    @ApiModelProperty(value = "내용")
    @NotBlank(message = "내용을 입력해주세요")
    private String content;

    @ApiModelProperty(value = "공개여부", example = "공개 or 비공개")
    @NotBlank(message = "공개여부를 선택해주세요")
    private String visible;

    @ApiModelProperty(value = "작성일")
    private LocalDateTime createDate;

    @ApiModelProperty(value = "수정일")
    private LocalDateTime updateDate;

    @ApiModelProperty(value = "답변 등록 여부")
    private String status;

    @ApiModelProperty(value = "파일")
    private List<String> images;

    @ApiModelProperty(value = "댓글")
    private List<DeskCommentResDto> comments;
}
