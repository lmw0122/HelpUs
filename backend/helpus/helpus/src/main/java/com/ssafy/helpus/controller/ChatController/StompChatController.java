package com.ssafy.helpus.controller.ChatController;

import com.ssafy.helpus.dto.Chat.ChatLogDto;
import com.ssafy.helpus.model.Chat.ChatLog;
import com.ssafy.helpus.model.Chat.ChatRoom;
import com.ssafy.helpus.repository.Chat.ChatLogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class StompChatController {
    public StompChatController(SimpMessagingTemplate template) {
        this.template = template;
    }

    private static final Logger logger = LoggerFactory.getLogger(com.ssafy.helpus.controller.ChatController.StompChatController.class);

    private final SimpMessagingTemplate template;

    @Autowired
    ChatLogRepository chatLogRepository;

    @MessageMapping({"/chatting/message"})
    public void saveMessage(ChatLogDto message) {
        logger.info("my message : " + message);
        ChatLog cl = new ChatLog();
        String toChatlog = "";
        ChatRoom cr = new ChatRoom();
        cr.setChatroomId(message.getChatroomId());
        cl.setDate(message.getDate());
        cl.setSender(message.getSender());
        cl.setChatRoom(cr);
        boolean over = false;
        cl.setOver(over);
        cl.setMessage(message.getMessage());

        try {
            this.chatLogRepository.save(cl);
        } catch (Exception e) {
            logger.info("my message insert error: " + e.getMessage());
        }
        this.template.convertAndSend("/sub/chatting/room/" + message.getChatroomId(), cl);
    }
}