package com.transportmanegment.Transport.repository;

import com.transportmanegment.Transport.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}
