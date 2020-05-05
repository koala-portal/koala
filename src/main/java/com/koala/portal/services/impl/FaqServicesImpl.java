package com.koala.portal.services.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.koala.portal.exceptions.EntityNotFoundException;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.Faq;
import com.koala.portal.models.FaqCategory;
import com.koala.portal.repos.FaqCategoryRepo;
import com.koala.portal.repos.FaqRepo;
import com.koala.portal.services.FaqServices;

@Service
public class FaqServicesImpl implements FaqServices {

	@Autowired
	private FaqRepo faqRepo;
	
	@Autowired
	private FaqCategoryRepo faqCategoryServices;
	
	@Override
	public List<Faq> getAll() {		
		return Lists.newArrayList(faqRepo.findAll());
	}

	@Override
	public Faq get(long id) throws EntityNotFoundException {
		return getFaq(id);
	}

	@Override
	public Faq create(Faq faq) throws InvalidFormException {
		if (faq.getId() != 0)
			throw new InvalidFormException("You provided a FAQ with an ID field set to " + faq.getId() + ".  When creating a new FAQ the system is responsible for assigning all IDs.", "Re-submit your form without the ID field set or set it to zero.");
		
		sharedSaveUpdateValidation(faq);
		
		faq.setUpdated(new Date());
		
		return faqRepo.save(faq);
	}
	
	@Override
	public void update(Faq faq) throws InvalidFormException, EntityNotFoundException {
		if (faq.getId() <= 0)
			throw new InvalidFormException("You provided a FAQ with an ID field set to " + faq.getId() + ".  When updating a FAQ its existing ID must be used.", "Re-submit your form with the ID field of the FAQ set to the proper value.");
		sharedSaveUpdateValidation(faq);
		getFaq(faq.getId());
		
		faq.setUpdated(new Date());
		
		faqRepo.save(faq);
	}
	
	private void sharedSaveUpdateValidation(Faq faq) throws InvalidFormException {
		if (StringUtils.isBlank(faq.getTitle()))
			throw new InvalidFormException("The 'Title' field is blank or null and is a required field.", "Provide a valid value in the 'Title' field and try again.");
		if (StringUtils.isBlank(faq.getDesc()))
			throw new InvalidFormException("The 'Desc' field is blank or null and is a required field.", "Provide a valid value in the 'Desc' field and try again.");
		if (StringUtils.isBlank(faq.getInfo()))
			throw new InvalidFormException("The 'Info' field is blank or null and is a required field.", "Provide a valid value in the 'Info' field and try again.");
	}

	@Override
	public void remove(long id) throws EntityNotFoundException {
		if (!faqRepo.findById(id).isPresent())
			throw new EntityNotFoundException("FAQ", Long.toString(id));
		
		faqRepo.deleteById(id);
	}

	@Override
	public void viewed(long id) throws EntityNotFoundException {
		Faq faq = getFaq(id);
		faq.viewed();
		faqRepo.save(faq);
	}
	
	private Faq getFaq(long id) throws EntityNotFoundException {
		Optional<Faq> faq = faqRepo.findById(id);
		
		if (!faq.isPresent())
			throw new EntityNotFoundException("FAQ", Long.toString(id));
		
		return faq.get();
	}

	@Override
	public List<FaqCategory> getAllCategories() {
		return faqCategoryServices.findAllByOrderBySortOrderAsc();
	}
	
	@Override
	public FaqCategory getCategory(long id) throws EntityNotFoundException {
		return getFaqCategory(id);
	}
	
	@Override
	public FaqCategory create(FaqCategory newFaqCategory) throws InvalidFormException {
		if (newFaqCategory.getId() != 0)
			throw new InvalidFormException("You provided a FAQ category with an ID field set to " + newFaqCategory.getId() + ".  When creating a new FAQ category the system is responsible for assigning all IDs.", "Re-submit your form without the ID field set or set it to zero.");
		
		sharedSaveUpdateValidation(newFaqCategory);
		
		newFaqCategory.setSortOrder(faqCategoryServices.getNextSortOrderValue());
		
		return faqCategoryServices.save(newFaqCategory);
	}
	
	@Override
	public void update(FaqCategory newFaqCategory) throws InvalidFormException, EntityNotFoundException {
		if (newFaqCategory.getId() <= 0)
			throw new InvalidFormException("You provided a FAQ category with an ID field set to " + newFaqCategory.getId() + ".  When updating a FAQ category its existing ID must be used.", "Re-submit your form with the ID field of the FAQ category set to the proper value.");
		
		sharedSaveUpdateValidation(newFaqCategory);
		getFaqCategory(newFaqCategory.getId());
		
		faqCategoryServices.save(newFaqCategory);
	}
	
	private void sharedSaveUpdateValidation(FaqCategory faq) throws InvalidFormException {
		if (StringUtils.isBlank(faq.getTitle()))
			throw new InvalidFormException("The 'Title' field is blank or null and is a required field.", "Provide a valid value in the 'Title' field and try again.");
		if (StringUtils.isBlank(faq.getDesc()))
			throw new InvalidFormException("The 'Desc' field is blank or null and is a required field.", "Provide a valid value in the 'Desc' field and try again.");
	}
	
	private FaqCategory getFaqCategory(long id) throws EntityNotFoundException {
		Optional<FaqCategory> faqCategory = faqCategoryServices.findById(id);
		
		if (!faqCategory.isPresent())
			throw new EntityNotFoundException("FAQ Category", Long.toString(id));
		
		return faqCategory.get();
	}
}
