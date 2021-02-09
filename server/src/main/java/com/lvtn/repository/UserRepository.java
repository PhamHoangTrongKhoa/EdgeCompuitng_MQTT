package com.lvtn.repository;

import com.lvtn.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    public User getUserByMail(String mail);
    public User getUserByMailAndPassword(String mail, String password);
}
