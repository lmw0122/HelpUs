package com.ssafy.helpus.controller.ChatController;

import com.ssafy.helpus.model.Chat.ChatLog;
import com.ssafy.helpus.model.Chat.ChatRoom;
import com.ssafy.helpus.repository.Chat.ChatLogRepository;
import com.ssafy.helpus.repository.Chat.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/chat"})
public class ChatController {
    @Autowired
    ChatRoomRepository chatRoomRepository;

    @Autowired
    ChatLogRepository chatLogRepository;


    @GetMapping({"/user"})
    public ResponseEntity<String> getUserId(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
//        VerificationImpl verificationImpl = new VerificationImpl();
//        String userId = verificationImpl.verify(token);
        return ResponseEntity.ok().body("user");
    }

    @GetMapping({"/list"})
    public ResponseEntity<List<Map<String, String>>> getListAll(HttpServletRequest request) {

        String userId = request.getHeader("memberIdByToken");
        System.out.println(userId);
        List<Map<String, String>> tmp = new ArrayList<>();
        tmp.addAll(this.chatRoomRepository.findRoomByID1(userId));
        tmp.addAll(this.chatRoomRepository.findRoomByID2(userId));
        System.out.println("tmp : " + tmp);
        return ResponseEntity.ok().body(tmp);
    }

    @GetMapping({"/enter/{oppUserId}"})
    public ResponseEntity<Map<String, String>> getChatroomId(@PathVariable String oppUserId, HttpServletRequest request) {
        Map<String, String> result = new HashMap<>();
        String userId = request.getHeader("memberIdByToken");
        String user1 = "";
        String user2 = "";
        if (userId.compareTo(oppUserId) < 0) {
            user1 = userId;
            user2 = oppUserId;
        } else {
            if (userId.compareTo(oppUserId) == 0) {
                result.put("message", "same Id");
                return ResponseEntity.badRequest().body(result);
            }
            user2 = userId;
            user1 = oppUserId;
        }
        try {
            result.put("chatroomId", String.valueOf(this.chatRoomRepository.findRoomBy2Id(user1, user2)));
        } catch (Exception e) {
            result.put("message", e.getMessage());
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(result);
    }

    @GetMapping({"/logs/{chatroomId}/{lastMessageId}/{totalCount}/{count}"})
    public ResponseEntity<List<ChatLog>> getChatLog(@PathVariable int chatroomId, @PathVariable int lastMessageId, @PathVariable int totalCount, @PathVariable int count) {
        List<ChatLog> result = new ArrayList<>();
        boolean isLast = false;
        int gap = 15;
        int from = totalCount - gap * count;
        if (from < 0) {
            gap += from;
            from = 0;
            isLast = true;
        }
        System.out.println("c id : "+chatroomId+" from : "+from+" lastId : "+lastMessageId+" gap : "+gap);
        try {
            result = this.chatLogRepository.findByChatroomIdAndLastMessageId(chatroomId, from, lastMessageId, gap);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        for(int i=0; i<result.size(); i++){
            System.out.println(result.get(i).getMessage());
        }
        if (isLast)
            return ResponseEntity.accepted().body(result);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping({"/counts/{chatroomId}"})
    public ResponseEntity<List<Map<String, Integer>>> getCounts(@PathVariable("chatroomId") int chatroomId) {
        List<Map<String, Integer>> list = new ArrayList<>();
        list = this.chatLogRepository.getCount(chatroomId);
        return ResponseEntity.ok().body(list);
    }

    @PostMapping({"/room/{oppUserId}"})
    public ResponseEntity<Map<String, String>> createRoom(@PathVariable String oppUserId, HttpServletRequest request) {
        Map<String, String> result = new HashMap<>();
        String userId = request.getHeader("memberIdByToken");
        String user1 = "";
        String user2 = "";
        if (userId.compareTo(oppUserId) < 0) {
            user1 = userId;
            user2 = oppUserId;
        } else {
            if (userId.compareTo(oppUserId) == 0) {
                result.put("message", "same Id");
                return ResponseEntity.badRequest().body(result);
            }
            user2 = userId;
            user1 = oppUserId;
        }
        try {
            int roomId = ((ChatRoom)this.chatRoomRepository.save(ChatRoom.builder().user1(user1).user2(user2).build())).getChatroomId();
            result.put("chatroomId", String.valueOf(roomId));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            result.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
        }
        return ResponseEntity.ok().body(result);
    }
}
