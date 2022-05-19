package com.ssafy.helpus.repository.Chat;

import com.ssafy.helpus.model.Chat.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {
    @Query(value = "SELECT * from (SELECT r.chatroom_id as chatroomId, r.user2 as user, m.message, m.date FROM chat_room r, chat_log m WHERE r.user1 = :userId AND r.chatroom_id = m.chatroom_id order by m.date desc LIMIT 18446744073709551615) filtered group by chatroomId order by date desc;", nativeQuery = true)
    List<Map<String, String>> findRoomByID1(@Param("userId") String paramString);

    @Query(value = "SELECT * from (SELECT r.chatroom_id as chatroomId, r.user1 as user, m.message, m.date FROM chat_room r, chat_log m WHERE r.user2 = :userId AND r.chatroom_id = m.chatroom_id order by m.date desc LIMIT 18446744073709551615) filtered group by chatroomId order by date desc;", nativeQuery = true)
    List<Map<String, String>> findRoomByID2(@Param("userId") String paramString);

    @Query(value = "SELECT chatroom_id FROM chat_room WHERE user1 = :user1 AND user2 = :user2", nativeQuery = true)
    int findRoomBy2Id(@Param("user1") String paramString1, @Param("user2") String paramString2);

    @Query(value = "INSERT INTO chat_room(user1,user2) VALUES (:user1,:user2)", nativeQuery = true)
    int createRoom(@Param("user1") String paramString1, @Param("user2") String paramString2);
}
