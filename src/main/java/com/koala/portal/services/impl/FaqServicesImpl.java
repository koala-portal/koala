package com.koala.portal.services.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.koala.portal.daos.FaqDao;
import com.koala.portal.exceptions.EntityNotFoundException;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.Faq;
import com.koala.portal.models.FaqCategory;
import com.koala.portal.models.FaqViewTracker;
import com.koala.portal.models.FaqViewsId;
import com.koala.portal.repos.FaqCategoryRepo;
import com.koala.portal.repos.FaqRepo;
import com.koala.portal.repos.FaqViewsRepo;
import com.koala.portal.services.FaqServices;

@Service
public class FaqServicesImpl implements FaqServices {

	@Autowired
	protected FaqRepo faqRepo;
	
	@Autowired
	protected FaqDao faqDao;
	
	@Autowired
	protected FaqCategoryRepo faqCategoryRepo;
	
	@Autowired
	protected FaqViewsRepo faqViewsRepo;
	
	@Value("${max.num.top.questions:5}") // value after ':' is the default
	private int maxTopQuestions;
	
	@Value("${days.back.top.faqs:30}") // value after ':' is the default
	private int daysBackTopFaqs;
		
	@Override
	public List<Faq> getAll() {		
		return Lists.newArrayList(faqRepo.findAll());
	}
	
	@Override
	public List<Faq> getAll(Integer categoryId) throws EntityNotFoundException {
		FaqCategory fc = getFaqCategory(categoryId);	//If the category ID is invalid an EntityNotFoundException will be thrown from getFaqCategory().
		
		//If they selected the "Top Questions" category then we select n number of FAQs, regardless of their assigned category, and return those based on how far back we want to look.
		if (fc.isTopQuestionsCategory()) {
			Calendar cal = Calendar.getInstance();
			cal.setTime(new Date());
			cal.add(Calendar.DAY_OF_MONTH, 1);	//Take the hours out of the equation
			Date to = cal.getTime();
			cal.add(Calendar.DAY_OF_MONTH, ((Integer.valueOf(daysBackTopFaqs)+1)*-1));

			return faqDao.getTopFaqs(cal.getTime(), to, maxTopQuestions);
		} else {
			return faqRepo.findByCategoryOrderByTitle(fc);
		}
	}

	@Override
	public Faq get(long id) throws EntityNotFoundException {
		return getFaq(id);
	}

	@Override
	public Faq create(Faq faq) throws InvalidFormException, EntityNotFoundException {
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
		
		//Preserve times viewed count, while at the same time making sure that the FAQ already exist
		faq.setTimesViewed(getFaq(faq.getId()).getTimesViewed());
		faq.setUpdated(new Date());
		
		faqRepo.save(faq);
	}
	
	private void sharedSaveUpdateValidation(Faq faq) throws InvalidFormException, EntityNotFoundException {
		if (StringUtils.isBlank(faq.getTitle()))
			throw new InvalidFormException("The 'Title' field is blank or null and is a required field.", "Provide a valid value in the 'Title' field and try again.");
		if (StringUtils.isBlank(faq.getDescription()))
			throw new InvalidFormException("The 'Desc' field is blank or null and is a required field.", "Provide a valid value in the 'Desc' field and try again.");
		if (StringUtils.isBlank(faq.getInfo()))
			throw new InvalidFormException("The 'Info' field is blank or null and is a required field.", "Provide a valid value in the 'Info' field and try again.");
		
		if (faq.getCategory() == null || faq.getCategory().getId() <= 0)
			throw new InvalidFormException("A valid FAQ category ID was not provided.", "Provide a valid FAQ category ID and try again.");
		
		if (getFaqCategory(faq.getCategory().getId()).isTopQuestionsCategory())
			throw new InvalidFormException("The Top Questions category was selected as this FAQ's category, which is not permitted.", "Select the correct category for this FAQ that is not the Top Questions category, or create a new category that is more appropriate and use that.");
	}

	@Override
	public void remove(long id) throws EntityNotFoundException {
		if (!faqRepo.findById(id).isPresent())
			throw new EntityNotFoundException("FAQ", Long.toString(id));
		
		faqRepo.deleteById(id);
	}

	private Faq getFaq(long id) throws EntityNotFoundException {
		Optional<Faq> faq = faqRepo.findById(id);
		
		if (!faq.isPresent())
			throw new EntityNotFoundException("FAQ", Long.toString(id));
		
		return faq.get();
	}
	
	@Override
	public List<FaqCategory> getAllCategories() {
		return faqCategoryRepo.findAllByOrderByTopQuestionsCategoryDescTitleAsc();
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
		
		return faqCategoryRepo.save(newFaqCategory);
	}
	
	@Override
	public void update(FaqCategory updatedFaqCategory) throws InvalidFormException, EntityNotFoundException {
		if (updatedFaqCategory.getId() <= 0)
			throw new InvalidFormException("You provided a FAQ category with an ID field set to " + updatedFaqCategory.getId() + ".  When updating a FAQ category its existing ID must be used.", "Re-submit your form with the ID field of the FAQ category set to the proper value.");
		
		sharedSaveUpdateValidation(updatedFaqCategory);
		getFaqCategory(updatedFaqCategory.getId());
		
		faqCategoryRepo.save(updatedFaqCategory);
	}

	@Override
	public void removeCategory(long id) throws InvalidFormException, EntityNotFoundException {
		Optional<FaqCategory> fcOption = faqCategoryRepo.findById(id);
		if (!fcOption.isPresent())
			throw new EntityNotFoundException("FAQ Category", Long.toString(id));
		
		//Make sure there are not FAQs tied to this category.  Also make sure that it's not the Top Questions category
		FaqCategory fc = fcOption.get();
		if (fc.isTopQuestionsCategory())
			throw new InvalidFormException("FAQ categories marked as a 'Top Questions' category cannot be deleted", "Nothing can be done through the service, please contact the development team if you truly need this category removed.");
		
		if (faqRepo.findByCategoryOrderByTitle(fc).size() != 0)
			throw new InvalidFormException("You cannot delete a FAQ category that has FAQs assigned to it.", "First remove all associated FAQs from this category and then try again.");
		
		faqCategoryRepo.delete(fc);
	}
	
	private void sharedSaveUpdateValidation(FaqCategory faq) throws InvalidFormException {
		if (StringUtils.isBlank(faq.getTitle()))
			throw new InvalidFormException("The 'Title' field is blank or null and is a required field.", "Provide a valid value in the 'Title' field and try again.");
		if (StringUtils.isBlank(faq.getDescription()))
			throw new InvalidFormException("The 'Desc' field is blank or null and is a required field.", "Provide a valid value in the 'Desc' field and try again.");
	}
	
	private FaqCategory getFaqCategory(long id) throws EntityNotFoundException {
		Optional<FaqCategory> faqCategory = faqCategoryRepo.findById(id);
		
		if (!faqCategory.isPresent())
			throw new EntityNotFoundException("FAQ Category", Long.toString(id));
		
		return faqCategory.get();
	}
	
	private final Calendar cal = Calendar.getInstance();
	@Override
	public void viewed(long id) throws EntityNotFoundException {
		//First capture the total number of times this FAQ has been viewed in the same table as the content of the FAQ
		Faq faq = getFaq(id);
		faq.viewed();
		faqRepo.save(faq);
		
		cal.setTime(new Date());
		cal.set(Calendar.HOUR_OF_DAY, 12);
		cal.set(Calendar.MINUTE, 00);
		cal.set(Calendar.SECOND, 00);
		cal.set(Calendar.MILLISECOND, 0);

		FaqViewTracker fvt = new FaqViewTracker(new FaqViewsId(id, cal.getTime()));

		Optional<FaqViewTracker> viewedObj = faqViewsRepo.findById(fvt.getFaqViewsId());
		if (viewedObj.isPresent()) {
			FaqViewTracker val = viewedObj.get();
			val.setCounter(val.getCounter() + 1);
			faqViewsRepo.save(val);
		} else {
			fvt.setCounter(1);
			faqViewsRepo.save(fvt);
		}
	}
}
