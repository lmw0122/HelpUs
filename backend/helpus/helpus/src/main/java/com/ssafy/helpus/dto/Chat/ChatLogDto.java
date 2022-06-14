package com.ssafy.helpus.dto.Chat;

import lombok.Builder;

import java.time.LocalDateTime;

//@Builder
public class ChatLogDto {
    private LocalDateTime date;

    private String message;

    private String sender;

    private int chatroomId;

    public ChatLogDto() {}

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public void setChatroomId(int chatroomId) {
        this.chatroomId = chatroomId;
    }

    public String toString() {
        return "ChatLogDTO(date=" + getDate() + ", message=" + getMessage() + ", sender=" + getSender() + ", chatroomId=" + getChatroomId() + ")";
    }

    public LocalDateTime getDate() {
        return this.date;
    }

    public String getMessage() {
        return this.message;
    }

    public String getSender() {
        return this.sender;
    }

    public int getChatroomId() {
        return this.chatroomId;
    }


    public ChatLogDto(int chatroomId, LocalDateTime date, String message, String sender) {
        this.chatroomId = chatroomId;
        this.date = date;
        this.message = message;
        this.sender = sender;
    }
}
