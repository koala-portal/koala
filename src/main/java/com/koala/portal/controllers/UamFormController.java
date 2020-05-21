package com.koala.portal.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.koala.portal.domain.form.FormStatus;
import com.koala.portal.exceptions.EntityNotFoundException;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.UamForm;
import com.koala.portal.models.UserDetails;
import com.koala.portal.services.UamFormServices;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Api(value="UAM Form Controller")
public class UamFormController extends BaseController {
	
	@Autowired
	private UamFormServices uamFormServices;

	@RequestMapping(value = "/uamform", method = RequestMethod.GET, produces={MediaType.APPLICATION_JSON_VALUE})
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Based on role, return all UAM forms this person is permitted to see.  There is an optional field that will filter all forms by their status.", response = UserDetails.class)
	@ApiResponses(value = {
	        @ApiResponse(code = 200, message = "All forms that you're permitted to see."),
	        @ApiResponse(code = 401, message = "You are not authorized to enter the system because we don't know who you are."),
	        @ApiResponse(code = 403, message = "You are not authorized to enter the system because we DO know who you are and we still don't trust your ass.")
	})
	@PreAuthorize("isFullyAuthenticated()")
	public List<UamForm> getAll(@RequestParam(required = false, name="status") FormStatus status) throws InvalidFormException {
		if (status == null) {
			return uamFormServices.getAll(getUser());
		} else {
			return uamFormServices.getAll(	getUser(),
											status);
		}
	}
	
	@RequestMapping(value = "/uamform/{id}", method = RequestMethod.GET, produces={MediaType.APPLICATION_JSON_VALUE})
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Based on role, return the UAM form and any details the user is permitted to see.", response = UserDetails.class)
	@ApiResponses(value = {
	        @ApiResponse(code = 200, message = "The form."),
	        @ApiResponse(code = 401, message = "You are not authorized to enter the system because we don't know who you are."),
	        @ApiResponse(code = 403, message = "You are not authorized to enter the system because we DO know who you are and we still don't trust your ass."),
	        @ApiResponse(code = 404, message = "Could not find the UAM form you are looking for.")
	})
	@PreAuthorize("isFullyAuthenticated()")
	public UamForm get(@PathVariable(required = true, name="id") long id) throws InvalidFormException, EntityNotFoundException {
		return uamFormServices.get(id, getUser());
	}
	
	@RequestMapping(value = "/uamform", method = RequestMethod.POST, produces={MediaType.APPLICATION_JSON_VALUE}, consumes= {MediaType.APPLICATION_JSON_VALUE})
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Based on role, return all UAM forms this person is permitted to see.  Currently only a KOALA Admin can create a new form and kick off the process.", response = UserDetails.class)
	@ApiResponses(value = {
	        @ApiResponse(code = 201, message = "The form has been created.  An email has gone out to the person associated with the assigneeId."),
	        @ApiResponse(code = 401, message = "You are not authorized to enter the system because we don't know who you are."),
	        @ApiResponse(code = 403, message = "You are not authorized to enter the system because we DO know who you are and we still don't trust your ass.")
	})
	@PreAuthorize("hasAuthority('ADMIN')")
	public UamForm create(@RequestBody UserDetails user) throws InvalidFormException, EntityNotFoundException {
		return uamFormServices.create(user.getUserCreds(), getUser());
	}
	
}
