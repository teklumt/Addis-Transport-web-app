package com.transportmanegment.Transport.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.transportmanegment.Transport.model.Histories;
import com.transportmanegment.Transport.repository.HistoriesRepository;

@Service
public class HistoriesService {

    @Autowired
    private HistoriesRepository historiesRepository;

    public List<Histories> ListAll() {
        return historiesRepository.findAll();
    }

    public void save(Histories histories) {
        historiesRepository.save(histories);
    }

    public Histories get(Integer id) {
        return historiesRepository.findById(id).orElse(null);
    }

    public void delete(Integer id) {
        historiesRepository.deleteById(id);
    }

}
