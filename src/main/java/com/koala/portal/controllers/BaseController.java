package com.koala.portal.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.koala.portal.domain.ErrorInfo;
import com.koala.portal.exceptions.EntityNotFoundException;
import com.koala.portal.exceptions.InvalidFormException;


@RestController()
@RequestMapping(path="/api")
@CrossOrigin
public class BaseController {

	@ResponseStatus(HttpStatus.BAD_REQUEST)				// Defines the HTTP status code to return, 400 in this case.
	@ExceptionHandler(InvalidFormException.class)		// Tells it what Exception class to listen for, in this case we
														// need to create InvalidFormException for any time a user gives us bad data.
	@ResponseBody 										// Tells the method it's going to be writing to the response body (using Jackson,
														// a standard Java utility for handling JSON) to serialize the ErrorInfo 
														// object into JSON .
	public ErrorInfo handleBadRequest(HttpServletRequest req, InvalidFormException ex) {
		ex.printStackTrace();
		return new ErrorInfo(	HttpStatus.BAD_REQUEST.value(),
								ex.getMessage(),
								ex.getSolution());

	}
	
	@ResponseStatus(HttpStatus.NOT_FOUND)				// Defines the HTTP status code to return, 404 in this case.
	@ExceptionHandler(EntityNotFoundException.class)		// Tells it what Exception class to listen for, in this case we
														// need to create InvalidFormException for any time a user gives us bad data.
	@ResponseBody 										// Tells the method it's going to be writing to the response body (using Jackson,
														// a standard Java utility for handling JSON) to serialize the ErrorInfo 
														// object into JSON .
	public ErrorInfo handleBadRequest(HttpServletRequest req, EntityNotFoundException ex) {
		ex.printStackTrace();
		return new ErrorInfo(	HttpStatus.NOT_FOUND.value(),
								ex.getMessage(),
								"Check the ID of the entity you're try to find to ensure it's valid and try again.");

	}
	
	@ResponseStatus(HttpStatus.UNAUTHORIZED)				// Defines the HTTP status code to return, 401 in this case.
	@ExceptionHandler(UsernameNotFoundException.class)	// Tells it what Exception class to listen for, in this case we
														// need to create InvalidFormException for any time a user gives us bad data.
	@ResponseBody 										// Tells the method it's going to be writing to the response body (using Jackson,
														// a standard Java utility for handling JSON) to serialize the ErrorInfo 
														// object into JSON .
	public ErrorInfo handleBadRequest(HttpServletRequest req, UsernameNotFoundException ex) {
		ex.printStackTrace();
		return new ErrorInfo(	HttpStatus.UNAUTHORIZED.value(),
								ex.getMessage(),
								"The credentials provided could not be found in LDAP.  Please ensure they are valid and reach out to you administrator.  Do not contact KOALA in this case.");

	}
}