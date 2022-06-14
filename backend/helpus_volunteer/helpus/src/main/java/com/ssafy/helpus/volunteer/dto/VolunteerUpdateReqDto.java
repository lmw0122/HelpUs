package com.ssafy.helpus.volunteer.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@ApiModel(value = "봉사 글 수정")
@Getter
public class VolunteerUpdateReqDto {

    @ApiModelProperty(value = "물품 기부 글 고유번호")
    @NotNull(message = "물품 기부 글 고유번호를 입력해주세요")
    private Long volunteerId;

    @ApiModelProperty(value = "작성자 고유 번호")
    @NotNull(message = "작성자 고유 번호를 입력해주세요")
    private Long memberId;

    @ApiModelProperty(value = "제목")
    @NotBlank(message = "제목을 입력해주세요")
    private String title;

    @ApiModelProperty(value = "내용")
    @NotBlank(message = "내용을 입력해주세요")
    private String content;

    @ApiModelProperty(value = "봉사 우편번호")
    private int volZipcode;

    @ApiModelProperty(value = "봉사 장소")
    private String volAddress;

    @ApiModelProperty(value = "봉사 인원")
    private int people;

    @ApiModelProperty(value = "봉사 인원")
    private double time;

    @ApiModelProperty(value = "봉사일")
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm")
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime volDate;
}
