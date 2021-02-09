package com.lvtn.config;

import com.lvtn.security.CustomUserDetailsService;
import com.lvtn.security.FailureHandler;
import com.lvtn.security.SuccessHandler;
import com.lvtn.util.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private Utils utils;
    @Autowired
    private SuccessHandler successHandler;
    @Autowired
    private FailureHandler failureHandler;
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("**/resources/**");
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().authorizeRequests()
                .antMatchers("/lv/**").hasRole("USER")
                .anyRequest().permitAll()
                .and()
                .formLogin().loginPage("/login")
                .successHandler(successHandler).failureHandler(failureHandler)
                .and()
                .logout().logoutUrl("/logout").logoutSuccessUrl("/login?logout").invalidateHttpSession(true).deleteCookies("JSESSIONID")
                .and()
                .rememberMe().key("secret").userDetailsService(userDetailsService)
                .and()
                .csrf().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(utils.encoder(5));
    }
}
