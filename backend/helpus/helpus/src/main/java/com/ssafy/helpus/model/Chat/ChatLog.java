package com.ssafy.helpus.model.Chat;

import lombok.Builder;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "chat_log")
@Builder
public class ChatLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private int message_id;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "is_over")
    private boolean isOver;

    @Column(name = "message")
    private String message;

    @Column(name = "sender")
    private String sender;

    @ManyToOne
    @JoinColumn(name = "chatroom_id")
    private ChatRoom chatRoom;

    public ChatLog() {}

    public ChatLog(int message_id, LocalDateTime date, boolean isOver, String message, String sender, ChatRoom chatRoom) {
        this.message_id = message_id;
        this.date = date;
        this.isOver = isOver;
        this.message = message;
        this.sender = sender;
        this.chatRoom = chatRoom;
    }

    public void setMessage_id(int message_id) {
        this.message_id = message_id;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public void setOver(boolean isOver) {
        this.isOver = isOver;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public void setChatRoom(ChatRoom chatRoom) {
        this.chatRoom = chatRoom;
    }

    public String toString() {
        return "ChatLog(message_id=" + getMessage_id() + ", date=" + getDate() + ", isOver=" + isOver() + ", message=" + getMessage() + ", sender=" + getSender() + ", chatRoom=" + getChatRoom() + ")";
    }

    public int getMessage_id() {
        return this.message_id;
    }

    public LocalDateTime getDate() {
        return this.date;
    }

    public boolean isOver() {
        return this.isOver;
    }

    public String getMessage() {
        return this.message;
    }

    public String getSender() {
        return this.sender;
    }

    public ChatRoom getChatRoom() {
        return this.chatRoom;
    }

    public ChatLog(LocalDateTime date, boolean isOver, String message, String sender) {
        this.message = message;
        this.sender = sender;
        this.date = date;
        this.isOver = isOver;
    }
}

