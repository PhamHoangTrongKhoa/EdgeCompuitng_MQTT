package com.lvtn.security;

import com.lvtn.model.User;
import com.lvtn.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepository.getUserByMail(s);
        if (user==null){
            throw new UsernameNotFoundException("Bad Credentials");
        }else{
            return new CustomUserDetails(user);
        }
    }
}
