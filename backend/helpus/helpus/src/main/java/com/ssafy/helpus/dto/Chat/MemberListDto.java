package com.ssafy.helpus.dto.Chat;

import java.time.LocalDateTime;

public class MemberListDto implements Comparable<MemberListDto> {
    private String user;

    private String message;

    private LocalDateTime date;

    public void setUser(String user) {
        this.user = user;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public MemberListDto() {}

    public MemberListDto(String user, String message, LocalDateTime date) {
        this.user = user;
        this.message = message;
        this.date = date;
    }

    public String getUser() {
        return this.user;
    }

    public String getMessage() {
        return this.message;
    }

    public LocalDateTime getDate() {
        return this.date;
    }

    public int compareTo(MemberListDto o) {
        return this.date.compareTo(o.date);
    }
}
