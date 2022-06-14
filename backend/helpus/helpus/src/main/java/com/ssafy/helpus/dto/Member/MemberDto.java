package com.ssafy.helpus.dto.Member;

import com.ssafy.helpus.model.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberDto {
    private int memberId;

    private String email;

    private String password;

    private String name;

    private String tel;

    private String role;

    private String address;

    private String profile;

    private String registration;

    private String info;

    private String orgZipcode;

    private int warnCount;

    private LocalDateTime createDate;

}
