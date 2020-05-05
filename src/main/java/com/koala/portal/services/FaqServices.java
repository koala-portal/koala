package com.koala.portal.services;

import java.util.List;

import com.koala.portal.exceptions.EntityNotFoundException;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.Faq;
import com.koala.portal.models.FaqCategory;

public interface FaqServices {

	public List<Faq> getAll();
	
	public List<Faq> getAll(Integer categoryId) throws EntityNotFoundException;
	
	public Faq get(long id) throws EntityNotFoundException;

	public Faq create(Faq faq) throws InvalidFormException;
	
	public void update(Faq faq) throws InvalidFormException, EntityNotFoundException;
	
	public void remove(long id) throws EntityNotFoundException;

	public void viewed(long id) throws EntityNotFoundException;

	public List<FaqCategory> getAllCategories();

	public FaqCategory getCategory(long id) throws EntityNotFoundException;
	
	public FaqCategory create(FaqCategory newFaqCategory) throws InvalidFormException;
	
	public void update(FaqCategory newFaqCategory) throws InvalidFormException, EntityNotFoundException;

	
}
