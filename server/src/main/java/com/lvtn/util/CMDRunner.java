package com.lvtn.util;

import com.lvtn.model.*;
import com.lvtn.repository.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
public class CMDRunner implements CommandLineRunner {
    private static final String TAG = "Command Line Runner";
    private static Logger log = LogManager.getLogger();
    private static final int N = 100;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DHTRepository dhtRepository;
    @Autowired
    private MiscRepository miscRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private DeviceRepository deviceRepository;
    @Autowired
    private RoomDeviceRepository roomDeviceRepository;
    @Autowired
    private SDRepository sdRepository;
    @Autowired
    private Utils utils;
    @Override
    public void run(String... args) throws Exception {
        addUsers();
        addRoom();
        addSD();
        addDevices();
        populate();
        log.info("DONE");
    }

    private void populate(){
        List<Room> rooms = roomRepository.findAll();
        DHT[] dhts = new DHT[N];
        Misc[] msc = new Misc[N];
        Random random = new Random();
        Date now = new Date();
        for (int i=0; i<N; i++){
            double t = 25 + random.nextInt(25);
            double h = 75 + random.nextInt(20);
            double s = 100 + random.nextInt(250);
            double l = random.nextInt(1000);
            Date d = new Date(now.getTime()+300000);
            dhts[i] = new DHT(t, h, d, rooms.get(random.nextInt(4)));
            msc[i] = new Misc(s, l, d, rooms.get(random.nextInt(4)));
            dhtRepository.save(dhts[i]);
            miscRepository.save(msc[i]);
            now = d;
        }
    }

    private void addRoom(){
        Room[] rooms = new Room[4];
        rooms[0] = new Room("One");
        roomRepository.save(rooms[0]);
        rooms[1] = new Room("Two");
        roomRepository.save(rooms[1]);
        rooms[2] = new Room("Three");
        roomRepository.save(rooms[2]);
        rooms[3] = new Room("Four");
        roomRepository.save(rooms[3]);
    }

    private void addUsers(){
        User u1 = new User("norman","norman@gmail.com",
                utils.encoder(5).encode("Norman"));
        User u2 = new User("hauhuynh","hauhuynh66@gmail.com",
                utils.encoder(5).encode("Hauhuynh"));
        userRepository.save(u1);
        userRepository.save(u2);
    }

    private void addSD(){
        List<Room> rooms = roomRepository.findAll();
        StandardValue sd1 = new StandardValue(rooms.get(0), 30, 80, 300, 500);
        sdRepository.save(sd1);
        StandardValue sd2 = new StandardValue(rooms.get(1), 35, 90, 320, 700);
        sdRepository.save(sd2);
        StandardValue sd3 = new StandardValue(rooms.get(2), 33, 70, 260, 600);
        sdRepository.save(sd3);
    }

    private void addDevices(){
        Device fan = new Device("FAN");
        Device light = new Device("LIGHT");
        Device alarm = new Device("ALARM");
        deviceRepository.save(fan);
        deviceRepository.save(light);
        deviceRepository.save(alarm);
        Room r1 = roomRepository.findById(1);
        Room r2 = roomRepository.findById(2);
        Room r3 = roomRepository.findById(3);
        RoomDevice r1F = new RoomDevice(r1, fan, "OFF", "01led01");
        RoomDevice r1L = new RoomDevice(r1, light, "OFF", "01led02");
        RoomDevice r1S = new RoomDevice(r1, alarm, "ON", "01led03");
        roomDeviceRepository.save(r1F); roomDeviceRepository.save(r1L); roomDeviceRepository.save(r1S);
        RoomDevice r2F = new RoomDevice(r2, fan, "OFF", "02led01");
        RoomDevice r2L = new RoomDevice(r2, light, "OFF", "02led02");
        RoomDevice r3F = new RoomDevice(r3, fan, "OFF", "03led01");
        RoomDevice r3L = new RoomDevice(r3, light, "OFF", "03led02");
        roomDeviceRepository.save(r2F); roomDeviceRepository.save(r2L);
        roomDeviceRepository.save(r3F); roomDeviceRepository.save(r3L);
    }


}
