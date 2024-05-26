package com.transportmanegment.Transport.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.transportmanegment.Transport.model.Feedback;
import com.transportmanegment.Transport.repository.FeedbackRepository;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    public List<Feedback> ListAll() {
        return feedbackRepository.findAll();
    }

    public void save(Feedback feedback) {
        feedbackRepository.save(feedback);
    }

    public Feedback get(Integer id) {
        return feedbackRepository.findById(id).orElse(null);
    }

    public void delete(Integer id) {
        feedbackRepository.deleteById(id);
    }
}