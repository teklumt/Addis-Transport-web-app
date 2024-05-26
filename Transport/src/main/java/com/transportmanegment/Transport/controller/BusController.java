package com.transportmanegment.Transport.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.transportmanegment.Transport.model.Bus;
import com.transportmanegment.Transport.service.BusService;

@RestController
@RequestMapping("/bus")
@CrossOrigin(origins = "*")
public class BusController {
    @Autowired
    private BusService busService;

    @GetMapping("/getAll")
    public List<Bus> list() {
        return busService.ListAll();
    }

    @PostMapping("/add")
    public String save(@RequestBody Bus bus) {
        busService.save(bus);
        return "new Bus added";
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bus> get(@PathVariable Integer id) {
        try {
            Bus bus = busService.get(id);
            return new ResponseEntity<Bus>(bus, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Bus>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bus> update(@RequestBody Bus bus, @PathVariable Integer id) {
        try {
            Bus existingBus = busService.get(id);
            // bus.setId(id);
            busService.save(bus);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Bus>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id) {
        busService.delete(id);
        return "Bus deleted";
    }

}
