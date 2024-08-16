package com.grindlaysresort.roomModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface RoomHasBedTypeDao extends JpaRepository<RoomHasBedType,Integer> {

    @Query(value = "select * from room_has_bedtype where bedtype_id = :bedid and room_id = :roomid", nativeQuery = true)
    public List<RoomHasBedType> findRoomCountByBedTypeAndRoomId(@Param("bedid") int bedTypeId,@Param("roomid") int roomId);

    @Query(value = "select * from room_has_bedtype where  room_id = :roomid", nativeQuery = true)
    public List<RoomHasBedType> findRoomCountByRoomId(@Param("roomid") int roomId);

}
