package com.lvtn.repository;

import com.lvtn.model.DHT;
import com.lvtn.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface DHTRepository extends JpaRepository<DHT, Integer> {
    List<DHT> getAllByRoom(Room room);
    List<DHT> getAllByRoomAndDateGreaterThanAndDateLessThan(Room room, Date from, Date to);
    List<DHT> getAllByRoomAndDateGreaterThanAndDateLessThanAndTempGreaterThan(Room room, Date from, Date to, double temp);
    List<DHT> getAllByRoomAndDateGreaterThanAndDateLessThanAndHumidGreaterThan(Room room, Date from, Date to, double humid);
    List<DHT> getTop20ByRoomOrderByDateDesc(Room room);
    DHT getTopByRoomOrderByDateDesc(Room room);
    DHT getTopByRoomAndDateGreaterThanAndDateLessThanOrderByTempDesc(Room room, Date from, Date to);
    DHT getTopByRoomAndDateGreaterThanAndDateLessThanOrderByHumidDesc(Room room, Date from, Date to);
}
