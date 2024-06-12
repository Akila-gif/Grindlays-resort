//package com.grindlaysresort.loginDetails;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class WebConfiguration {
//
//
//    private BCryptPasswordEncoder bCryptPasswordEncoder;
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http, HttpSecurity httpSecurity) throws Exception {
//        httpSecurity.authorizeRequests(authentication -> {
//                    authentication.requestMatchers("/login").permitAll()
//                            .requestMatchers("/createadmin").permitAll()
//                            .requestMatchers("/resource/**").permitAll()
//                            .requestMatchers("/user").permitAll()
//                            .requestMatchers("/index").hasAnyAuthority("admin","Manager")
//                            .requestMatchers("/emp/**").hasAnyAuthority("admin")
//                            .anyRequest().authenticated();
//                })
//                .formLogin(formLogin -> {
//                    formLogin.loginPage("/login")
//                            .defaultSuccessUrl("/index")
//                            .failureUrl("/login")
//                            .usernameParameter("username")
//                            .passwordParameter("password");
//                })
//                .exceptionHandling(exception -> {
//                    exception.accessDeniedPage("/error");
//                })
//                .logout(logout -> {
//                    logout.logoutUrl("/logout").logoutSuccessUrl("/login");
//                })
//                .csrf(httpSecurityCsrfConfigurer -> {
//                    httpSecurityCsrfConfigurer.disable();
//                });
//
//        return httpSecurity.build();
//    }
//
//    @Bean
//    public BCryptPasswordEncoder getbCryptPasswordEncoder() {
//        bCryptPasswordEncoder = new BCryptPasswordEncoder();
//        return bCryptPasswordEncoder;
//    }
//
//}
