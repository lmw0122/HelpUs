package com.ssafy.helpus.repository.Chat;

import com.ssafy.helpus.model.Chat.ChatLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Map;

@Repository
public interface ChatLogRepository extends JpaRepository<ChatLog, Integer> {
//    @Query(value = "SELECT * FROM chat_log WHERE chatroom_id = :chatroom_id", countQuery = "SELECT count(*) FROM chat_log WHERE chatroom_id = :chatroom_id", nativeQuery = true)
//    List<ChatLog> findByChatroomId(@Param("chatroom_id") int paramInt, Pageable paramPageable);

    @Query(value = "SELECT MAX(message_id) from chat_log", nativeQuery = true)
    int findMaxId();

    @Query(value = "SELECT * FROM chat_log WHERE chatroom_id = :chatroomId AND message_id <= :last limit :from,:gap", nativeQuery = true)
    List<ChatLog> findByChatroomIdAndLastMessageId(@Param("chatroomId") int paramInt1, @Param("from") int paramInt2, @Param("last") int paramInt3, @Param("gap") int paramInt4);

    @Query(value = "SELECT COUNT(message_id) as totalCount, MAX(message_id) as lastMessageId FROM chat_log WHERE chatroom_id = :chatroomId", nativeQuery = true)
    List<Map<String, Integer>> getCount(@Param("chatroomId") int paramInt);
}
