package com.koala.portal.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.koala.portal.domain.notes.NoteCategory;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.Note;
import com.koala.portal.services.NotesServices;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Api(value="Notes Controller")
public class NotesController extends BaseController {
	
	@Autowired
	private NotesServices notesServices;

	@RequestMapping(value = "/notes/{category}/{entityId}", method = RequestMethod.GET, produces={MediaType.APPLICATION_JSON_VALUE})
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Based on role and values provided, return all notes for a given entity.", response = Note.class)
	@ApiResponses(value = {
	        @ApiResponse(code = 200, message = "All notes that match the provided criteria that you're permitted to see."),
	        @ApiResponse(code = 401, message = "You are not authorized to enter the system because we don't know who you are."),
	        @ApiResponse(code = 403, message = "You are not authorized to enter the system because we DO know who you are and we still don't trust your ass.")
	})
	@PreAuthorize("isFullyAuthenticated()")
	public List<Note> getAll(	@PathVariable(required = true, name="category") NoteCategory category,
								@PathVariable(required = true, name="entityId") Long entityId) throws InvalidFormException {
		return notesServices.getAll(	category,
									entityId,
									getUser());
	}
	
}
