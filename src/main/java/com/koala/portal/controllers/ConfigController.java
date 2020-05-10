package com.koala.portal.controllers;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.koala.portal.exceptions.InvalidConfigException;
import com.koala.portal.utils.PermittedConfigProperties;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Api(value="Returns config values that may be needed by the front end.")
public class ConfigController extends BaseController {

	@Autowired
	private Environment env;
	
	@RequestMapping(value = "/config/{key}", method = RequestMethod.GET, produces={MediaType.TEXT_PLAIN_VALUE})
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Returns a string value based on the key provided.", response = String.class)
	@ApiResponses(value = {
	        @ApiResponse(code = 200, message = "The value that maps to the key"),
	        @ApiResponse(code = 401, message = "You are not authorized to view the value because we don't know who you are."),
	        @ApiResponse(code = 403, message = "You are not authorized to view the value because we DO know who you are and we still don't trust your ass.")
	})
	@PreAuthorize("isFullyAuthenticated()")
	public String get(@PathVariable(value="key") String key) throws InvalidConfigException {
		if (PermittedConfigProperties.isPublicProperty(key)) {
			return StringUtils.isNotBlank(env.getProperty(key))?env.getProperty(key):System.getProperty(key);
		} else {
			throw new InvalidConfigException("'" + key + "' is not a public config value.", "Select a valid public config value and re-submit your request.");
		}
		 
	}
	
}
