package com.transportmanegment.Transport.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.transportmanegment.Transport.model.News;

public interface NewsRepository extends JpaRepository<News, Integer> {

}
