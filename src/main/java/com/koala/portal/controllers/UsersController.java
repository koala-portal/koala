package com.koala.portal.controllers;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.koala.portal.domain.PortalRoles;
import com.koala.portal.exceptions.InvalidConfigException;
import com.koala.portal.models.UserDetails;
import com.koala.portal.services.NameResolutionService;
import com.koala.portal.utils.PermittedConfigProperties;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Api(value="API for looking up users on the system.")
public class UsersController extends BaseController {
	
	@Autowired
	private NameResolutionService nameResolutionService;
	
	@RequestMapping(value = "/users", method = RequestMethod.GET, produces={MediaType.APPLICATION_JSON_VALUE})
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Returns a list of users.", response = List.class)
	@ApiResponses(value = {
	        @ApiResponse(code = 200, message = "All user found that match the criteria provided"),
	        @ApiResponse(code = 401, message = "You are not authorized to view the value because we don't know who you are."),
	        @ApiResponse(code = 403, message = "You are not authorized to view the value because we DO know who you are and we still don't trust your ass.")
	})
	@PreAuthorize("isFullyAuthenticated()")
	public List<UserDetails> get(@RequestParam(value="name", required=false) String name) {
		List<UserDetails> userList = new ArrayList<UserDetails>();
		//@TODO - Check that name is at least 3 or more characters long before doing anything
		//@TODO - Make sure to make 'name' required, right now it's set to not be
		/*
		if (StringUtils.isBlank(name))
			return userList;
		*/
		
		//This is all hard coded, and needs to be moved to a service
		UserDetails u = new UserDetails(null, "KOALA-ADMIN", PortalRoles.ADMIN);
		u.setUserName(nameResolutionService.resolveToLabel(u.getUserCreds()));
		userList.add(u);
		
		u = new UserDetails(null, "KOALA-VIEWER", PortalRoles.PARTNER);
		u.setUserName(nameResolutionService.resolveToLabel(u.getUserCreds()));
		userList.add(u);
		
		u = new UserDetails(null, "KOALA-EMPLOYEE", PortalRoles.EMPLOYEE);
		u.setUserName(nameResolutionService.resolveToLabel(u.getUserCreds()));
		userList.add(u);
		
		return userList;
	}
	
}
