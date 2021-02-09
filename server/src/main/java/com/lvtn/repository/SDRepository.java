package com.lvtn.repository;

import com.lvtn.model.Room;
import com.lvtn.model.StandardValue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SDRepository extends JpaRepository<StandardValue, Long> {
    StandardValue getByRoom(Room room);
}
