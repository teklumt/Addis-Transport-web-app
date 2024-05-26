package com.transportmanegment.Transport.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.transportmanegment.Transport.model.News;
import com.transportmanegment.Transport.repository.NewsRepository;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    public List<News> ListAll() {
        return newsRepository.findAll();
    }

    public void save(News news) {
        newsRepository.save(news);
    }

    public News get(Integer id) {
        return newsRepository.findById(id).orElse(null);
    }

    public void delete(Integer id) {
        newsRepository.deleteById(id);
    }

}
