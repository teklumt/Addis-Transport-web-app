package com.transportmanegment.Transport.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.support.Repositories;
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

import com.transportmanegment.Transport.model.Feedback;
import com.transportmanegment.Transport.service.FeedbackService;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/getAll")
    public List<Feedback> list() {
        return feedbackService.ListAll();
    }

    @PostMapping("/")
    public String save(@RequestBody Feedback feedback) {
        feedbackService.save(feedback);
        return "new Feedback added";
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feedback> get(@PathVariable Integer id) {
        try {
            Feedback feedback = feedbackService.get(id);
            return new ResponseEntity<Feedback>(feedback, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Feedback>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")

    public String delete(@PathVariable Integer id) {
        feedbackService.delete(id);
        return "Feedback deleted";
    }

}