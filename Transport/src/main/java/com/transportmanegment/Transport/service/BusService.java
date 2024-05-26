package com.transportmanegment.Transport.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.transportmanegment.Transport.model.Bus;
import com.transportmanegment.Transport.repository.BusRepository;

@Service
public class BusService {

    @Autowired
    private BusRepository busRepository;

    public List<Bus> ListAll() {
        return busRepository.findAll();
    }

    public void save(Bus bus) {
        busRepository.save(bus);
    }

    public Bus get(Integer id) {
        return busRepository.findById(id).get();
    }

    public void delete(Integer id) {
        busRepository.deleteById(id);
    }

}
