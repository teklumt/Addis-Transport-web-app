package com.transportmanegment.Transport.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.transportmanegment.Transport.model.Student;
import com.transportmanegment.Transport.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> ListAll() {
        return studentRepository.findAll();
    }

    public void save(Student student) {
        studentRepository.save(student);
    }

    public Student get(Integer id) {
        return studentRepository.findById(id).get();
    }

    public void delete(Integer id) {
        studentRepository.deleteById(id);
    }

}
