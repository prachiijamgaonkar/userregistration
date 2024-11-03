package com.edu.user_data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.user_data.entity.User;

@Repository
public interface UserRepository extends  JpaRepository<User,Integer> {
	User findUserByEmailAndPassword(String email, String password);

}
