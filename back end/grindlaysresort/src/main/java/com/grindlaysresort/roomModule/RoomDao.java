package com.grindlaysresort.roomModule;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomDao extends JpaRepository<Room,Integer> {

    @Query(value = "select concat('R', lpad((SELECT SUBSTRING((SELECT max(r.number) FROM grindlays_resort.room r), 2))+1,4,0))", nativeQuery = true)
    String nextRoomNumber();

    @Modifying
    @Transactional
    @Query(value = "UPDATE grindlays_resort.room_has_bedtype SET bed_count = :bedCount WHERE room_id = :roomId AND bedtype_id = :bedTypeId", nativeQuery = true)
    void setRoomBedCount(@Param("bedCount") int bedCount, @Param("roomId") int roomId, @Param("bedTypeId") int bedTypeId);


    @Modifying
    @Transactional
    @Query(value = "DELETE FROM grindlays_resort.room_has_bedtype WHERE room_id = :roomid", nativeQuery = true)
    void deleteRoomBedTypes(@Param("roomid") int roomId);
}
