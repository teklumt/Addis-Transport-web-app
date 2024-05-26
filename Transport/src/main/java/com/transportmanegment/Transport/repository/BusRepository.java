package com.transportmanegment.Transport.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.transportmanegment.Transport.model.Bus;

public interface BusRepository extends JpaRepository<Bus, Integer> {

}
