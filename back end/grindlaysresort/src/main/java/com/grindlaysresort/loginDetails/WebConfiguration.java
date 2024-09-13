package com.grindlaysresort.loginDetails;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
@EnableWebSecurity
public class WebConfiguration {

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private CustomAuthenticationFailureHandler customAuthenticationFailureHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeRequests(authentication -> {
                    authentication.requestMatchers("/login").permitAll()
                            .requestMatchers("/createadmin").permitAll()
                            .requestMatchers("/resources/**").permitAll()
                            .requestMatchers("/cssFile/**").permitAll()
                            .requestMatchers("/jsFiles/**").permitAll()
                            .requestMatchers("/user").permitAll()
                            .requestMatchers("/room/**").permitAll()
                            .requestMatchers("/emp/**").permitAll()
                            .requestMatchers("/roomtype/**").permitAll()
                            .requestMatchers("/feature/**").permitAll()
                            .requestMatchers("/privilege/**").permitAll()
                            .requestMatchers("/report/**").permitAll()
                            .requestMatchers("http://localhost:8080/privilege/Employee?user=admin").permitAll()
                            .requestMatchers("/index").hasAnyAuthority("admin","Manager","Akila")
                            //.requestMatchers("/emp/**").hasAnyAuthority("admin")
                            .anyRequest().authenticated();
                })
                .formLogin(formLogin -> {
                    formLogin.loginPage("/login")
                            .defaultSuccessUrl("/index")
                            .failureHandler(customAuthenticationFailureHandler)
                            .usernameParameter("username")
                            .passwordParameter("password");
                })
                .exceptionHandling(exception -> {
                    exception.accessDeniedPage("/error");
                })
                .logout(logout -> {
                    logout.logoutUrl("/logout").logoutSuccessUrl("/login");
                })
                .csrf(httpSecurityCsrfConfigurer -> {
                    httpSecurityCsrfConfigurer.disable();
                })
                .headers(headers->{
                    headers.frameOptions((frameOptions -> frameOptions.disable()));
                });

        return httpSecurity.build();
    }

    @Bean
    public BCryptPasswordEncoder getbCryptPasswordEncoder() {
        bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder;
    }

}
