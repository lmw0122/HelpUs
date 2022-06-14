package com.ssafy.helpus.model.Chat;

import lombok.Builder;

import javax.persistence.*;

@Entity(name = "chat_room")
@Builder
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED", name = "chatroom_id")
    private int chatroomId;

    private String user1;

    private String user2;

    public ChatRoom() {}

    public ChatRoom(int chatroomId, String user1, String user2) {
        this.chatroomId = chatroomId;
        this.user1 = user1;
        this.user2 = user2;
    }

    public void setChatroomId(int chatroomId) {
        this.chatroomId = chatroomId;
    }

    public void setUser1(String user1) {
        this.user1 = user1;
    }

    public void setUser2(String user2) {
        this.user2 = user2;
    }

    public String toString() {
        return "ChatRoom(chatroomId=" + getChatroomId() + ", user1=" + getUser1() + ", user2=" + getUser2() + ")";
    }

    public int getChatroomId() {
        return this.chatroomId;
    }

    public String getUser1() {
        return this.user1;
    }

    public String getUser2() {
        return this.user2;
    }

    public ChatRoom(String user1, String user2) {
        this.user1 = user1;
        this.user2 = user2;
    }
}
