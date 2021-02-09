package com.lvtn.repository;

import com.lvtn.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device, Integer> {
    Device findByName(String name);
}
