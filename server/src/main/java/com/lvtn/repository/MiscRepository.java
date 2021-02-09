package com.lvtn.repository;

import com.lvtn.model.Misc;
import com.lvtn.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface MiscRepository extends JpaRepository<Misc, Integer> {
    List<Misc> getAllByRoom(Room room);
    List<Misc> getAllByRoomAndDateGreaterThanAndDateLessThan(Room room, Date from, Date to);
    List<Misc> getTop20ByRoomOrderByDateDesc(Room room);
    List<Misc> getAllByRoomAndDateGreaterThanAndDateLessThanAndLightGreaterThan(Room room, Date from, Date to, double light);
    List<Misc> getAllByRoomAndDateGreaterThanAndDateLessThanAndSmokeGreaterThan(Room room, Date from, Date to, double smoke);
    Misc getTopByRoomOrderByDateDesc(Room room);
    Misc getTopByRoomAndDateGreaterThanAndDateLessThanOrderByLightDesc(Room room, Date from, Date to);
    Misc getTopByRoomAndDateGreaterThanAndDateLessThanOrderBySmokeDesc(Room room, Date from, Date to);
}
