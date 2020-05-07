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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.koala.portal.exceptions.EntityNotFoundException;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.Faq;
import com.koala.portal.models.FaqCategory;
import com.koala.portal.services.FaqServices;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Api(value="FAQ Controller")
public class FaqController extends BaseController {

	@Autowired
	private FaqServices faqServices;
	
	@RequestMapping(value = {"/faqs", "/faqs/{categoryId}"}, method = RequestMethod.GET, produces={MediaType.APPLICATION_JSON_VALUE})
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "View a list of all existing FAQs.  An optional FAQ category ID can be passed in so that only FAQs from that category are returned.", response = List.class)
	@ApiResponses(value = {
	        @ApiResponse(code = 200, message = "Successfully retrieved the list of FAQs"),
	        @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
	        @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden")
	})
	@PreAuthorize("isFullyAuthenticated()")
	public List<Faq> getAll(@PathVariable(name = "categoryId", required=false) Integer categoryId) throws EntityNotFoundException{
		if (null == categoryId) {
			return faqServices.getAll();
		} else {
			return faqServices.getAll(categoryId);
		}
	}
	
	@RequestMapping(value = "/faqCategory", method = RequestMethod.GET, produces={MediaType.APPLICATION_JSON_VALUE})
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "View a list of all existing FAQ categories.", response = List.class)
	@ApiResponses(value = {
	        @ApiResponse(code = 200, message = "Successfully retrieved the list of FAQ categories"),
	        @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
	        @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden")
	})
	@PreAuthorize("isFullyAuthenticated()")
	public List<FaqCategory> getAllCategories() throws InvalidFormException{
		return faqServices.getAllCategories();
	}
	
	@RequestMapping(value = "/faq/{faqId}", method = RequestMethod.GET, produces={MediaType.APPLICATION_JSON_VALUE})
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "View a specific FAQ thats ID maps to the provided value.", response = Faq.class)
	@ApiResponses(value = {
	        @ApiResponse(code = 200, message = "Successfully retrieved the specific FAQ"),
	        @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
	        @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
	        @ApiResponse(code = 404, message = "The FAQ you were trying to reach is not found or does not exist.  Please check the response body for details.")
	})
	@PreAuthorize("isFullyAuthenticated()")
	public Faq get(@PathVariable(value="faqId") long id) throws EntityNotFoundException{
		return faqServices.get(id);
	}
	
	@RequestMapping(value = "/faqCategory/{faqCategoryId}", method = RequestMethod.GET, produces={MediaType.APPLICATION_JSON_VALUE})
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "View a specific FAQ category thats ID maps to the provided value.", response = Faq.class)
	@ApiResponses(value = {
	        @ApiResponse(code = 200, message = "Successfully retrieved the specific FAQ category"),
	        @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
	        @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
	        @ApiResponse(code = 404, message = "The FAQ category you were trying to reach is not found or does not exist.  Please check the response body for details.")
	})
	@PreAuthorize("isFullyAuthenticated()")
	public FaqCategory getCategory(@PathVariable(value="faqCategoryId") long id) throws EntityNotFoundException{
		return faqServices.getCategory(id);
	}
	
	@RequestMapping(value = "/faq", method = RequestMethod.POST, consumes= {MediaType.APPLICATION_JSON_VALUE}, produces={MediaType.APPLICATION_JSON_VALUE})
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Create a new FAQ that can be viewed by everyone.  The FAQ provided will be augmented with it's new ID and created/updated date.", response = Faq.class)
	@ApiResponses(value = {
	        @ApiResponse(code = 201, message = "Successfully created the new FAQ"),
	        @ApiResponse(code = 401, message = "You are not authorized to create the resource"),
	        @ApiResponse(code = 403, message = "Creating the resource is forbidden"),
	        @ApiResponse(code = 400, message = "The FAQ you submitted could not be created because there were issues.  Please check the response body for details.")
	})
	@PreAuthorize("hasAuthority('ADMIN')")
	public Faq create(@RequestBody Faq newFaq) throws InvalidFormException, EntityNotFoundException{
		return faqServices.create(newFaq);
	}
	
	@RequestMapping(value = "/faqCategory", method = RequestMethod.POST, consumes= {MediaType.APPLICATION_JSON_VALUE}, produces={MediaType.APPLICATION_JSON_VALUE})
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Create a new FAQ category to help organize FAQs.  The FAQ category provided will be augmented with it's new ID and sort order which can be changed later.", response = FaqCategory.class)
	@ApiResponses(value = {
	        @ApiResponse(code = 201, message = "Successfully created the new FAQ category"),
	        @ApiResponse(code = 401, message = "You are not authorized to create the resource"),
	        @ApiResponse(code = 403, message = "Creating the resource is forbidden"),
	        @ApiResponse(code = 400, message = "The FAQ you submitted could not be created because there were issues.  Please check the response body for details.")
	})
	@PreAuthorize("hasAuthority('ADMIN')")
	public FaqCategory create(@RequestBody FaqCategory newFaqCategory) throws InvalidFormException{
		return faqServices.create(newFaqCategory);
	}
	
	@RequestMapping(value = "/faq", method = RequestMethod.PUT, consumes= {MediaType.APPLICATION_JSON_VALUE})
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Update an existing FAQ that maps to the provided ID value.  In addition to updating the values provided by the client, the updated date will be updated by the system.")
	@ApiResponses(value = {
	        @ApiResponse(code = 204, message = "Successfully updated the FAQ, no response body returned"),
	        @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
	        @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
	        @ApiResponse(code = 400, message = "The FAQ you submitted could not be updated because there were issues.  Please check the response body for details."),
	        @ApiResponse(code = 404, message = "The FAQ you submitted could not be found in the system.  Please check the response body for details.")
	})
	@PreAuthorize("hasAuthority('ADMIN')")
	public void update(@RequestBody Faq existingFaq) throws EntityNotFoundException, InvalidFormException{
		faqServices.update(existingFaq);
	}
	
	@RequestMapping(value = "/faqCategory", method = RequestMethod.PUT, consumes= {MediaType.APPLICATION_JSON_VALUE})
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Update an existing FAQ category that maps to the provided ID value.")
	@ApiResponses(value = {
	        @ApiResponse(code = 204, message = "Successfully updated the FAQ category, no response body returned"),
	        @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
	        @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
	        @ApiResponse(code = 400, message = "The FAQ category you submitted could not be updated because there were issues.  Please check the response body for details."),
	        @ApiResponse(code = 404, message = "The FAQ category you submitted could not be found in the system.  Please check the response body for details.")
	})
	@PreAuthorize("hasAuthority('ADMIN')")
	public void update(@RequestBody FaqCategory newFaqCategory) throws EntityNotFoundException, InvalidFormException{
		faqServices.update(newFaqCategory);
	}
	
	@RequestMapping(value = "/faq/{faqId}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Remove an existing FAQ that maps to the provided ID value.  This is a hard delete so once the request is submitted if successful the FAQ is gone forever.")
	@ApiResponses(value = {
	        @ApiResponse(code = 204, message = "Successfully deleted the FAQ, no response body returned"),
	        @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
	        @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
	        @ApiResponse(code = 404, message = "The FAQ you were trying to reach is not found or does not exist.  Please check the response body for details.")
	})
	@PreAuthorize("hasAuthority('ADMIN')")
	public void remove(@PathVariable(value="faqId") long id) throws EntityNotFoundException{
		faqServices.remove(id);
	}
	
	@RequestMapping(value = "/faqCategory/{faqCategoryId}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Remove an existing FAQ category that maps to the provided ID value.  This is a hard delete so once the request is submitted if successful the FAQ is gone forever.  Also, it can have no FAQs tied to it prior to deleting it.")
	@ApiResponses(value = {
	        @ApiResponse(code = 204, message = "Successfully deleted the FAQ, no response body returned"),
	        @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
	        @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
	        @ApiResponse(code = 400, message = "This request was invalid, most likely due to FAQs still being linked to this category.  Please check the response body for exact details."),
	        @ApiResponse(code = 404, message = "The FAQ you were trying to reach is not found or does not exist.  Please check the response body for details.")
	})
	@PreAuthorize("hasAuthority('ADMIN')")
	public void removeCategory(@PathVariable(value="faqCategoryId") long id) throws EntityNotFoundException, InvalidFormException {
		faqServices.removeCategory(id);
	}
	
	@RequestMapping(value = "/faq/{faqId}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Update the timesViewed counter for metrics tracking purposes..")
	@ApiResponses(value = {
	        @ApiResponse(code = 204, message = "Successfully updated the counter that tracks how many times the FAQ was viewed, no response body returned"),
	        @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
	        @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
	        @ApiResponse(code = 404, message = "The FAQ you were trying to update is not found or does not exist.  Please check the response body for details.")
	})
	@PreAuthorize("isFullyAuthenticated()")
	public void update(@PathVariable(value="faqId") long id) throws EntityNotFoundException, InvalidFormException{
		faqServices.viewed(id);
	}
}
