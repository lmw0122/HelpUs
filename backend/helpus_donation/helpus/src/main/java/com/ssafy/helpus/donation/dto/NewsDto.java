package com.ssafy.helpus.donation.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.json.simple.JSONObject;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(value = "NewsDto : 뉴스 조회")
public class NewsDto {
	@ApiModelProperty(value = "제목")
	private String title;
	@ApiModelProperty(value = "링크")
	private String link;
	@ApiModelProperty(value = "내용")
	private String description;
	@ApiModelProperty(value = "작성일")
	private String date;

	public NewsDto(JSONObject newsJson) {
		this.title = (String) newsJson.get("title");
		this.link = (String) newsJson.get("link");
		this.description = (String) newsJson.get("description");
		this.date = (String) newsJson.get("pubDate");
	}
}
