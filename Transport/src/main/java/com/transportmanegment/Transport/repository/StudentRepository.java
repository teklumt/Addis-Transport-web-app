package com.transportmanegment.Transport.repository;

import com.transportmanegment.Transport.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {


}
