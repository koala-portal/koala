package com.koala.portal.controllers;

import java.beans.PropertyEditorSupport;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.koala.portal.domain.ErrorInfo;
import com.koala.portal.domain.PortalRoles;
import com.koala.portal.domain.form.FormAction;
import com.koala.portal.domain.form.FormStatus;
import com.koala.portal.domain.notes.NoteCategory;
import com.koala.portal.exceptions.EntityNotFoundException;
import com.koala.portal.exceptions.InvalidConfigException;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.User;
import com.koala.portal.models.UserDetails;


@RestController()
@RequestMapping(path="/api")
@CrossOrigin(origins = "http://localhost:4200")
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
	
	@ResponseStatus(HttpStatus.BAD_REQUEST)				// Defines the HTTP status code to return, 400 in this case.
	@ExceptionHandler(InvalidConfigException.class)		// Tells it what Exception class to listen for, in this case we
														// need to create InvalidConfigException for any time a user ask for a config 
														//that's not public.
	@ResponseBody 										// Tells the method it's going to be writing to the response body (using Jackson,
														// a standard Java utility for handling JSON) to serialize the ErrorInfo 
														// object into JSON .
	public ErrorInfo handleBadRequest(HttpServletRequest req, InvalidConfigException ex) {
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
								"The credentials provided could not be found in LDAP.  Please ensure they are valid and reach out to you administrator.  Do not contact the KOALA team in this case.");

	}
	
	@ResponseStatus(HttpStatus.FORBIDDEN)				// Defines the HTTP status code to return, 403 in this case.
	@ExceptionHandler(AccessDeniedException.class)		// Tells it what Exception class to listen for, in this case we
														// need to create InvalidFormException for any time a user gives us bad data.
	@ResponseBody 										// Tells the method it's going to be writing to the response body (using Jackson,
														// a standard Java utility for handling JSON) to serialize the ErrorInfo 
														// object into JSON .
	public ErrorInfo handleBadRequest(HttpServletRequest req, AccessDeniedException ex) {
		ex.printStackTrace();
		return new ErrorInfo(	HttpStatus.FORBIDDEN.value(),
								ex.getMessage(),
								"The credentials provided could be found in LDAP, however the LDAP entry maps to a role in the system that does not have permission to perform this action.  If you believe you should have access to this feature please contact the KOALA team.");

	}
	
	protected UserDetails getUser() {
		User userDetailsObj = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		UserDetails user = new UserDetails(	userDetailsObj.getUserLabel(), 
											userDetailsObj.getUsername(), 
											null);
		
		for (GrantedAuthority r : userDetailsObj.getAuthorities())
			user.setRole(PortalRoles.valueOf(r.getAuthority()));
		

		return user;
	}
	
	protected class FormStatusEnumConverter extends PropertyEditorSupport {
	    @Override
	    public void setAsText(String text) throws IllegalArgumentException {
	    		if (text == null) {
	    			setValue(null);
	    			return;
	    		}
	        setValue(FormStatus.valueOf(text.toUpperCase()));
	    }
	}
	
	protected class FormActionEnumConverter extends PropertyEditorSupport {
	    @Override
	    public void setAsText(String text) throws IllegalArgumentException {
	    		if (text == null) {
	    			setValue(null);
	    			return;
	    		}
	        setValue(FormAction.valueOf(text.toUpperCase()));
	    }
	}

	protected class NoteCategoryEnumConverter extends PropertyEditorSupport {
	    @Override
	    public void setAsText(String text) throws IllegalArgumentException {
	    		if (text == null) {
	    			setValue(null);
	    			return;
	    		}
	        setValue(NoteCategory.valueOf(text.toUpperCase()));
	    }
	}
	
	@InitBinder
	public void initBinder(WebDataBinder dataBinder) {
	    dataBinder.registerCustomEditor(FormStatus.class, new FormStatusEnumConverter());
	    dataBinder.registerCustomEditor(FormAction.class, new FormActionEnumConverter());
	    dataBinder.registerCustomEditor(NoteCategory.class, new NoteCategoryEnumConverter());	    
	}
	
}