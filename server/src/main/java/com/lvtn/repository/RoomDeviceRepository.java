package com.lvtn.repository;

import com.lvtn.model.Room;
import com.lvtn.model.RoomDevice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomDeviceRepository extends JpaRepository<RoomDevice, Long> {
    List<RoomDevice> getAllByRoom(Room room);
    RoomDevice findByNid(String nid);
}
