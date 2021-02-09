package com.lvtn.repository;

import com.lvtn.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    Room findById(long id);
}
