package com.transportmanegment.Transport.controller;

import java.util.List;
import java.util.NoSuchElementException;

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
import com.transportmanegment.Transport.model.News;
import com.transportmanegment.Transport.service.NewsService;

@RestController
@RequestMapping("/news")
@CrossOrigin(origins = "*")
public class NewsController {
    @Autowired
    private NewsService newsService;

    @GetMapping("/getAll")
    public List<News> list() {
        return newsService.ListAll();
    }

    @PostMapping("/add")
    public String save(@RequestBody News news) {
        newsService.save(news);
        return "new News added";
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> get(@PathVariable Integer id) {
        try {
            News news = newsService.get(id);
            return new ResponseEntity<News>(news, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<News>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<News> update(@RequestBody News news, @PathVariable Integer id) {
        try {
            News existingNews = newsService.get(id);
            existingNews.setTitle(news.getTitle());
            existingNews.setBody(news.getBody());
            existingNews.setTag(news.getTag());
            // set other properties as needed

            newsService.save(existingNews);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<News>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id) {
        newsService.delete(id);
        return "Bus deleted";
    }

}
