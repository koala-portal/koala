package com.koala.portal.controllers;

import com.koala.portal.constants.ResponseMessages;
import com.koala.portal.exceptions.EntityNotFoundException;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.Tool;
import com.koala.portal.services.ToolServices;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value = "Tool Controller")
@RequestMapping(value = "/tools", consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
@ResponseStatus(HttpStatus.OK)
public class ToolController extends BaseController {

    @Autowired
    ToolServices toolServices;

    @GetMapping()
    @ApiOperation(value = "View a list of all existing Tools.", response = List.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = ResponseMessages.OK_LIST_PREFIX + "Tools"),
            @ApiResponse(code = 401, message = ResponseMessages.UNAUTHORIZED_VIEW),
            @ApiResponse(code = 403, message = ResponseMessages.FORBIDDEN)
    })
    @PreAuthorize("isFullyAuthenticated()")
    public List<Tool> getAll() {
        return this.toolServices.findAll();
    }

    @GetMapping(value = "/{toolId}")
    @ApiOperation(value = "View a specific Tool with the given ID", response = Tool.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = ResponseMessages.OK_GET_PREFIX + "Tool"),
            @ApiResponse(code = 401, message = ResponseMessages.UNAUTHORIZED_VIEW),
            @ApiResponse(code = 403, message = ResponseMessages.FORBIDDEN),
            @ApiResponse(code = 404, message = "The Tool you were trying to reach is not found or does not exist.  Please check the response body for details.")
    })
    @PreAuthorize("isFullyAuthenticated()")
    public Tool get(@PathVariable(value = "toolId") long id) throws EntityNotFoundException {
        return this.toolServices.findById(id);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation(value = "Create a new Tool that can be viewed by everyone.", response = Tool.class)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = ResponseMessages.CREATED_PREFIX + "Tool"),
            @ApiResponse(code = 401, message = ResponseMessages.UNAUTHORIZED_CREATE),
            @ApiResponse(code = 403, message = ResponseMessages.FORBIDDEN),
            @ApiResponse(code = 400, message = "The Tool you submitted could not be created because there were issues.  Please check the response body for details.")
    })
    @PreAuthorize("hasAuthority('ADMIN')")
    public Tool create(@RequestBody Tool newTool) throws InvalidFormException {
        return toolServices.save(newTool);
    }

    @PutMapping(value = "/{toolId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Update an existing Tool that maps to the provided ID value.")
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "Successfully updated the Tool, no response body returned"),
            @ApiResponse(code = 401, message = ResponseMessages.UNAUTHORIZED_VIEW),
            @ApiResponse(code = 403, message = ResponseMessages.FORBIDDEN),
            @ApiResponse(code = 400, message = "The Tool you submitted could not be updated because there were issues.  Please check the response body for details."),
            @ApiResponse(code = 404, message = "The Tool you submitted could not be found in the system.  Please check the response body for details.")
    })
    @PreAuthorize("hasAuthority('ADMIN')")
    public void update(@PathVariable("toolId") Long id, @RequestBody Tool newTool) throws EntityNotFoundException, InvalidFormException {
        newTool.setId(id);
        toolServices.save(newTool);
    }
}

