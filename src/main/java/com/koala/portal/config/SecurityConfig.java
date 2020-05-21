package com.koala.portal.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * To learn more about Spring Security and leveraging x509 certificates go here:
 * https://medium.com/@niral22/2-way-ssl-with-spring-boot-microservices-2c97c974e83
 *
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailsService userService;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		//First let's set up our app to be stateless

        http
        .authorizeRequests()
			.antMatchers(HttpMethod.OPTIONS, "/api/**").permitAll()
            .anyRequest()
                .authenticated()
        .and()
            .x509()
            .userDetailsService(userService)
        .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
            .csrf()
                .disable();
		
		/* - This works
	    http.authorizeRequests()
	    .antMatchers("/swagger-ui.html").permitAll()
        //.antMatchers("/other static files here").permitAll()
        .antMatchers("/api/**").authenticated();
        */
        /*
		http
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
	    .userDetailsService(userService)
	    			.authorizeRequests()
	    			.antMatchers("/swagger-ui.html").permitAll()
	    			//.antMatchers("/other static files here").permitAll()
	    			.antMatchers("/api/**").authenticated()
	    		.and()
	    			.
	    		.and()
	    	    		.csrf().disable();
	    	    		*/
	    
		/*
	    http.csrf().disable();
	    http.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);
	    http
	            .httpBasic().disable()
	            .formLogin().disable()
	            .logout().disable()
	            .addFilter(new TokenBasedAuthenticationFilter(authenticationManager()))
	            .addFilter(new TokenBasedAuthorizationFilter(authenticationManager()));
	    http.authorizeRequests()
	            .antMatchers("/rest/unsecure/**").permitAll()
	            .antMatchers("/**").authenticated();
	       */
	}
}
