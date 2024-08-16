package com.grindlaysresort.roomModule.roomstates;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomStatesDao extends JpaRepository<RoomStates,Integer> {
}
