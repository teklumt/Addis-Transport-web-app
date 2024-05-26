package com.transportmanegment.Transport.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.transportmanegment.Transport.model.Histories;
import com.transportmanegment.Transport.service.HistoriesService;

@RestController
@RequestMapping("/histories")
@CrossOrigin(origins = "*")
public class HistoriesController {

    @Autowired
    private HistoriesService historiesService;

    @GetMapping("/getAll")
    public List<Histories> list() {
        return historiesService.ListAll();
    }

    @PostMapping("/add")
    public String save(@RequestBody Histories histories) {
        historiesService.save(histories);
        return "new Histories added";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id) {
        historiesService.delete(id);
        return "Histories deleted";
    }

}
