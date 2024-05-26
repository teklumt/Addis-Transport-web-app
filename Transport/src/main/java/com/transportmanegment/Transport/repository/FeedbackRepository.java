package com.transportmanegment.Transport.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.transportmanegment.Transport.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
}