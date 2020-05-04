package com.koala.portal.controllers;

import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.koala.portal.domain.PortalRoles;
import com.koala.portal.models.UserDetails;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Api(value="Who Am I Controller")
public class WhoAmIController extends BaseController {

	@RequestMapping(value = "/whoami", method = RequestMethod.GET, produces={MediaType.APPLICATION_JSON_VALUE})
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "See who's trying to access the system.", response = UserDetails.class)
	@ApiResponses(value = {
	        @ApiResponse(code = 200, message = "We know who you are and you're trusted"),
	        @ApiResponse(code = 401, message = "You are not authorized to enter the system because we don't know who you are."),
	        @ApiResponse(code = 403, message = "You are not authorized to enter the system because we DO know who you are and we still don't trust your ass.")
	})
	@PreAuthorize("isFullyAuthenticated()")
	public UserDetails whoAmI(Authentication authentication, Principal principal){
		UserDetails user = new UserDetails(authentication.getName(), principal.getName(), null);
		for (GrantedAuthority r : authentication.getAuthorities())
			user.setRole(PortalRoles.valueOf(r.getAuthority()));

		return user;
	}
	
}
