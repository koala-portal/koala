package com.koala.portal.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

import com.koala.portal.UnitTestDatabaseBootstrap;
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

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
  classes = { UnitTestDatabaseBootstrap.class }, 
  loader = AnnotationConfigContextLoader.class)
@Transactional
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class FaqServicesImplTest {
        
	@Value("${max.num.top.questions}") // value after ':' is the default
	private int maxTopQuestions;
	
	@Value("${days.back.top.faqs}") // value after ':' is the default
	private int daysBackTopFaqs;
	
    @Resource
    private FaqRepo faqRepo;
    
    @Resource
    private FaqCategoryRepo faqCategoryRepo;
    
    @Resource
	protected FaqViewsRepo faqViewsRepo;

    private void fullLoadDatabase() throws EntityNotFoundException {
    		FaqCategory faqCategoryU = new FaqCategory(1, "U##", "General question about what U## is.", false);	
    		FaqCategory faqCategoryGeneral = new FaqCategory(3, "Top FAQs", "The top {max.num.top.questions} FAQs over the past {days.back.top.faqs} days as determined by you, the users of KOALA.", true);
		FaqCategory faqCategorySal = new FaqCategory(2, "SAL", "General question about what SAL is.", false);
		FaqCategory faqCategoryAto = new FaqCategory(4, "K## in the ATO Process", "General question where K## fits into your A&A and ATO process.", false);
		
		//Save thes out of order on purpose
		faqCategoryRepo.save(faqCategoryU);
		faqCategoryRepo.save(faqCategorySal);
		faqCategoryRepo.save(faqCategoryGeneral);
		faqCategoryRepo.save(faqCategoryAto);		
		
		Faq f = new Faq(	5, 
						"Do I Need to Be in SAL", 
						"Maybe, I don't know.  What type of thing are you.", 
						"Look at this <a href=\"http://google.com\" target=\"_blank\">logic chart</a> and follow the path.", 
						new Date(), 
						0,
						faqCategorySal);
		faqRepo.save(f);
		
		f = new Faq(	6, 
					"How Do I Register in SAL", 
					"You do this through the registration section of SAL.", 
					"Go to this <a href=\"http://google.com\" target=\"_blank\">URL</a> and fill out the form and hit submit.", 
					new Date(), 
					3,
					faqCategorySal);
		faqRepo.save(f);		
		addView(f);
		addView(f);
		addView(f);
		
		f = new Faq(	7, 
				"Can I Waiver My App", 
				"I don't believe that my application or group can do what SAL wants us to do.", 
				"Put on your big boy/girl pants and figure it out.", 
				new Date(), 
				1,
				faqCategorySal);
		faqRepo.save(f);
		addView(f);
		
		// ---------------------------------------------------------------------------------------------------------------
		
		f = new Faq(	8, 
					"What is U##", 
					"This is something that may not apply to you, but it's on you to reach out to us and find out.", 
					"Go to the KOALA <a href=\"/tickets\" target=\"_blank\">tickets</a> section of KOALA and fill out a ticket.",
					new Date(), 
					2,
					faqCategoryU);
		faqRepo.save(f);
		addView(f);
		addView(f);

		f = new Faq(9, 
				"Who Installs U##", 
				"Is this something we install or do you guys install it for us.", 
				"We got this, we will reach out to you when and set up a time for us to do it.",
				new Date(), 
				1,
				faqCategoryU);
		faqRepo.save(f);
		addView(f);
		
		// ---------------------------------------------------------------------------------------------------------------
		
		f = new Faq(	10, 
					"What is K## Role in my A&A", 
					"Blah blah blah.", 
					"Yup, blah blah blah", 
					new Date(), 
					1,
					faqCategoryAto);
		faqRepo.save(f);
		addView(f);
		
		f = new Faq(	11, 
					"Can K## Actually Block/Stop Anything", 
					"Ya, you better believe we can.", 
					"Just work with us and we'll work with you.  We're not unreasonable.", 
					new Date(), 
					1,
					faqCategoryAto);
		faqRepo.save(f);
		addView(f);
		addView(f);
    }
    
    private final Calendar cal = Calendar.getInstance();
	private void addView(Faq faq) throws EntityNotFoundException {
		cal.setTime(new Date());
		cal.set(Calendar.HOUR_OF_DAY, 12);
		cal.set(Calendar.MINUTE, 00);
		cal.set(Calendar.SECOND, 00);
		cal.set(Calendar.MILLISECOND, 0);

		FaqViewTracker fvt = new FaqViewTracker(new FaqViewsId(faq.getId(), cal.getTime()));

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
    
	private FaqServices getFaqServices() {
		FaqServicesImpl faqServices = new FaqServicesImpl();
		faqServices.faqRepo = faqRepo;
		faqServices.faqCategoryRepo = faqCategoryRepo;
		faqServices.faqViewsRepo = faqViewsRepo;
		
		return faqServices;
	}
	
	/**
	 * Simplest of test.  Let's just see if we can get all of the FAQs back.  There should be 7 of them.
	 */
	@Test
	public void getAllFaqsTest() throws EntityNotFoundException {
		fullLoadDatabase();		
		assertEquals(7, getFaqServices().getAll().size());
	}
	
	/**
	 * First try to pull back all FAQs by a category ID that doesn't exist.  An EntityNotFoundException 
	 * should be thrown.
	 */
	@Test(expected=EntityNotFoundException.class)
	public void getAllFaqsByCategoryIdNotFoundTest() throws EntityNotFoundException {
		fullLoadDatabase();		
		getFaqServices().getAll(100);
	}
	
	/**
	 * Now try to pull back all FAQs by a category ID that does exist.  We know the 3 IDs 
	 * that should be coming back are 5, 6 and 7.
	 */
	@Test
	public void getAllFaqsByNonTopFaqCategoryIdTest() throws EntityNotFoundException {
		fullLoadDatabase();
		
		List<Faq> faqs = getFaqServices().getAll(2);
		assertEquals(3, faqs.size());
		for (Faq f : faqs)
			assertTrue(f.getId() == 5 || f.getId() == 6 || f.getId() == 7);
	}
	
	/**
	 * Now try to pull back all FAQs by a category ID that does exist and is also the Top FAQs 
	 * category.  We know the 3 IDs that should be coming back are 5, 6 and 7.
	 */
	@Test
	@Ignore(value="Need to figure out how to inject Persistence Context into FaqDaoImpl before finishing this test.")
	public void getAllFaqsByTopFaqCategoryIdTest() throws EntityNotFoundException {
		fullLoadDatabase();
		
		List<Faq> faqs = getFaqServices().getAll(1);
		assertEquals(5, faqs.size());
		for (Faq f : faqs)
			assertTrue(f.getId() == 6 || f.getId() == 8 || f.getId() == 11);
	}
	
	/**
	 * First try to pull back a specific FAQ by ID that doesn't exist.  An EntityNotFoundException 
	 * should be thrown.
	 */
	@Test(expected=EntityNotFoundException.class)
	public void getFaqByIdNotFoundTest() throws EntityNotFoundException {
		fullLoadDatabase();		
		getFaqServices().get(100);
	}
	
	/**
	 * Now try to pull back a specific FAQ by ID that does exist.
	 */
	@Test
	public void getFaqByIdTest() throws EntityNotFoundException {
		fullLoadDatabase();
		Faq f = getFaqServices().get(6);
		assertEquals("How Do I Register in SAL", f.getTitle());
		assertEquals(3, f.getTimesViewed());
	}
	
	/**
	 * Now create a FAQ, but pass in a non-zero value, which violates things because the 
	 * database is responsible for creating unique IDs.
	 */
	@Test(expected=InvalidFormException.class)
	public void createFaqProvideUniqueIdTest() throws EntityNotFoundException, InvalidFormException {
		fullLoadDatabase();
		Faq faq = new Faq(12, "TITLE", "DESC", "INFO", new Date(), 0, faqCategoryRepo.findById(2L).get());
		getFaqServices().create(faq);
	}
	
	/**
	 * Now create a FAQ, but pass in a null title.
	 */
	@Test(expected=InvalidFormException.class)
	public void createFaqNullTitleTest() throws EntityNotFoundException, InvalidFormException {
		fullLoadDatabase();
		Faq faq = new Faq(0, null, "DESC", "INFO", new Date(), 0, faqCategoryRepo.findById(2L).get());
		getFaqServices().create(faq);
	}
	
	/**
	 * Now create a FAQ, but pass in an empty title.
	 */
	@Test(expected=InvalidFormException.class)
	public void createFaqEmptyTitleTest() throws EntityNotFoundException, InvalidFormException {
		fullLoadDatabase();
		Faq faq = new Faq(0, "   ", "DESC", "INFO", new Date(), 0, faqCategoryRepo.findById(2L).get());
		getFaqServices().create(faq);
	}
	
	/**
	 * Now create a FAQ, but pass in a null description.
	 */
	@Test(expected=InvalidFormException.class)
	public void createFaqNullDescTest() throws EntityNotFoundException, InvalidFormException {
		fullLoadDatabase();
		Faq faq = new Faq(0, "TITLE", null, "INFO", new Date(), 0, faqCategoryRepo.findById(2L).get());
		getFaqServices().create(faq);
	}
	
	/**
	 * Now create a FAQ, but pass in an empty description.
	 */
	@Test(expected=InvalidFormException.class)
	public void createFaqEmptyDescTest() throws EntityNotFoundException, InvalidFormException {
		fullLoadDatabase();
		Faq faq = new Faq(0, "TITLE", "   ", "INFO", new Date(), 0, faqCategoryRepo.findById(2L).get());
		getFaqServices().create(faq);
	}
	
	/**
	 * Now create a FAQ, but pass in null info.
	 */
	@Test(expected=InvalidFormException.class)
	public void createFaqNullInfoTest() throws EntityNotFoundException, InvalidFormException {
		fullLoadDatabase();
		Faq faq = new Faq(0, "TITLE", "DESC", null, new Date(), 0, faqCategoryRepo.findById(2L).get());
		getFaqServices().create(faq);
	}
	
	/**
	 * Now create a FAQ, but pass in empty info.
	 */
	@Test(expected=InvalidFormException.class)
	public void createFaqEmptyInfoTest() throws EntityNotFoundException, InvalidFormException {
		fullLoadDatabase();
		Faq faq = new Faq(0, "TITLE", "DESC", null, new Date(), 0, faqCategoryRepo.findById(2L).get());
		getFaqServices().create(faq);
	}
	
	/**
	 * Now create a FAQ, but pass in a null category.
	 */
	@Test(expected=InvalidFormException.class)
	public void createFaqNullCategoryTest() throws EntityNotFoundException, InvalidFormException {
		fullLoadDatabase();
		Faq faq = new Faq(0, "TITLE", "DESC", "INFO", new Date(), 0, null);
		getFaqServices().create(faq);
	}
	
	/**
	 * Now create a FAQ, but pass in a category where the ID is zero.
	 */
	@Test(expected=InvalidFormException.class)
	public void createFaqInvalidCategoryIdTest() throws EntityNotFoundException, InvalidFormException {
		fullLoadDatabase();
		Faq faq = new Faq(0, "TITLE", "DESC", "INFO", new Date(), 0, new FaqCategory());
		getFaqServices().create(faq);
	}
	
	/**
	 * Now create a FAQ, but pass in a category where the ID maps to the Top Category which is a 
	 * violation per our business logic.  FAQs can only belong to categories that are not flagged 
	 * as "Top Questions".
	 */
	@Test(expected=InvalidFormException.class)
	public void createFaqCategoryIsTopQuestionsTest() throws EntityNotFoundException, InvalidFormException {
		fullLoadDatabase();
		FaqCategory fc = faqCategoryRepo.findById(3L).get();	//ID=1 is our Top Question category
		
		Faq faq = new Faq(0, "TITLE", "DESC", "INFO", new Date(), 0, fc);
		getFaqServices().create(faq);
	}
	
	/**
	 * Try to create what should be a valid FAQ.
	 */
	@Test
	public void createFaqTest() throws EntityNotFoundException, InvalidFormException {
		fullLoadDatabase();		
		Faq faq = new Faq(0, "TITLE", "DESC", "INFO", new Date(), 0, faqCategoryRepo.findById(2L).get());
		getFaqServices().create(faq);
		assertTrue(0 != faq.getId());
	}
	
	/**
	 * Now update a FAQ, but pass in an ID of zero.
	 */
	@Test(expected=InvalidFormException.class)
	public void updateFaqZeroIdTest() throws EntityNotFoundException, InvalidFormException {
		fullLoadDatabase();
		Faq faq = new Faq(0, "TITLE", "DESC", "INFO", new Date(), 0, faqCategoryRepo.findById(2L).get());
		getFaqServices().update(faq);
	}
	
	/**
	 * Now update a FAQ, and make sure that the view count is preserved even if zero is passed in.  Use 
	 * ID=6 since that already has 3 views associated with it.
	 */
	@Test
	public void updateFaqTest() throws EntityNotFoundException, InvalidFormException {
		fullLoadDatabase();
		Faq faq = new Faq(6, "NEW-TITLE", "NEW-DESC", "NEW-INFO", new Date(), 0, faqCategoryRepo.findById(2L).get());
		getFaqServices().update(faq);
		
		Faq f = faqRepo.findById(6L).get();
		assertEquals("NEW-TITLE", f.getTitle());
		assertEquals("NEW-DESC", f.getDescription());
		assertEquals("NEW-INFO", f.getInfo());
		assertEquals(3, f.getTimesViewed());
	}
	
	/**
	 * Now let's delete a FAQ, but we guessed wrong on the ID.
	 */
	@Test(expected=EntityNotFoundException.class)
	public void deleteFaqInvalidIdTest() throws EntityNotFoundException {
		fullLoadDatabase();
		getFaqServices().remove(100);
	}
	
	/**
	 * Now let's delete a FAQ for real
	 */
	@Test
	public void deleteFaqTest() throws EntityNotFoundException {
		fullLoadDatabase();
		FaqCategory faqCat = faqCategoryRepo.findById(2L).get();
		assertEquals(3, faqRepo.findByCategoryOrderByTitle(faqCat).size());
		getFaqServices().remove(6);
		List<Faq> remainingFaqs = faqRepo.findByCategoryOrderByTitle(faqCat);
		assertEquals(2, remainingFaqs.size());
		for (Faq f : remainingFaqs)
			assertTrue(f.getId() != 6);
	}
	
	/**
	 * Switching over to FAQ Categories now, let's pull them back ensuring 
	 * that they are ordered from Top Questions category and then in 
	 * Alpha-Order asc.
	 */
	@Test
	public void getAllCategoriesTest() throws EntityNotFoundException {
		fullLoadDatabase();
		List<FaqCategory> allFaqCats = getFaqServices().getAllCategories();

		assertEquals(4, allFaqCats.size());
		assertEquals("Top FAQs", allFaqCats.get(0).getTitle());
		assertEquals("K## in the ATO Process", allFaqCats.get(1).getTitle());
		assertEquals("SAL", allFaqCats.get(2).getTitle());
		assertEquals("U##", allFaqCats.get(3).getTitle());
	}
	
	/**
	 * Now get a single category, but the provided ID does not exist
	 */
	@Test(expected=EntityNotFoundException.class)
	public void getCategoryInvalidIdTest() throws EntityNotFoundException {
		fullLoadDatabase();
		getFaqServices().getCategory(100L);
	}
	
	/**
	 * Now get a single category, with a valid ID.
	 */
	@Test
	public void getCategoryTest() throws EntityNotFoundException {
		fullLoadDatabase();
		FaqCategory faqCat = getFaqServices().getCategory(3L);
		assertEquals("Top FAQs", faqCat.getTitle());
		assertTrue(faqCat.isTopQuestionsCategory());
	}
	
	/**
	 * Now try to create a new FAQ category, but in this case a non-zero ID is 
	 * provided, which is a violation when creating a new F.C. because this 
	 * should be done by the database.
	 */
	@Test(expected=InvalidFormException.class)
	public void createFaqCategoryInvalidIdTest() throws InvalidFormException {
		FaqCategory fc = new FaqCategory(1, "TITLE", "DESC", false);
		getFaqServices().create(fc);
	}
	
	/**
	 * Now try to create a new FAQ category, but in this case a null value is provided for the title.
	 */
	@Test(expected=InvalidFormException.class)
	public void createFaqCategoryNullTitleTest() throws InvalidFormException {
		FaqCategory fc = new FaqCategory(0, null, "DESC", false);
		getFaqServices().create(fc);
	}
	
	/**
	 * Now try to create a new FAQ category, but in this case a blank value is provided for the title.
	 */
	@Test(expected=InvalidFormException.class)
	public void createFaqCategoryBlankTitleTest() throws InvalidFormException {
		FaqCategory fc = new FaqCategory(0, "   ", "DESC", false);
		getFaqServices().create(fc);
	}
	
	/**
	 * Now try to create a new FAQ category, but in this case a null value is provided for the description.
	 */
	@Test(expected=InvalidFormException.class)
	public void createFaqCategoryNullDescTest() throws InvalidFormException {
		FaqCategory fc = new FaqCategory(0, "TITLE", null, false);
		getFaqServices().create(fc);
	}
	
	/**
	 * Now try to create a new FAQ category, but in this case a blank value is provided for the description.
	 */
	@Test(expected=InvalidFormException.class)
	public void createFaqCategoryBlankDescTest() throws InvalidFormException {
		FaqCategory fc = new FaqCategory(0, "TITLE", "   ", false);
		getFaqServices().create(fc);
	}
	
	/**
	 * Now save new FAQ category.
	 * @throws EntityNotFoundException 
	 */
	@Test
	public void createFaqCategoryTest() throws InvalidFormException, EntityNotFoundException {
		fullLoadDatabase();
		assertEquals(4, getFaqServices().getAllCategories().size());
		
		FaqCategory fc = new FaqCategory(0, "TITLE", "DESC", false);
		getFaqServices().create(fc);
		assertEquals(5, getFaqServices().getAllCategories().size());
	}
	
	/**
	 * Now try to update an existing FAQ category, but in this case a zero ID is 
	 * provided, which is a violation when updating a F.C.
	 */
	@Test(expected=InvalidFormException.class)
	public void updateFaqCategoryZeroIdTest() throws InvalidFormException, EntityNotFoundException {
		FaqCategory fc = new FaqCategory(0, "TITLE", "DESC", false);
		getFaqServices().update(fc);
	}
	
	/**
	 * Now try to update an existing FAQ category, but in this case an invalid ID is 
	 * provided, which is a violation when updating a F.C. because it doesn't exist.
	 */
	@Test(expected=EntityNotFoundException.class)
	public void updateFaqCategoryInvalidIdTest() throws InvalidFormException, EntityNotFoundException {
		FaqCategory fc = new FaqCategory(100, "TITLE", "DESC", false);
		getFaqServices().update(fc);
	}
	
	/**
	 * Finally try to update an existing FAQ category.
	 */
	@Test
	public void updateFaqCategoryTest() throws InvalidFormException, EntityNotFoundException {
		fullLoadDatabase();
		
		FaqCategory existingFaqCat = faqCategoryRepo.findById(3L).get();
		assertEquals("Top FAQs", existingFaqCat.getTitle());
		assertTrue(existingFaqCat.isTopQuestionsCategory());
		
		FaqCategory fc = new FaqCategory(3, "TITLE", "DESC", false);
		getFaqServices().update(fc);
		
		assertEquals("TITLE", existingFaqCat.getTitle());
		assertFalse(existingFaqCat.isTopQuestionsCategory());
	}
	
	/**
	 * Try to remove a FAQ Category that does not exist.
	 */
	@Test(expected=EntityNotFoundException.class)
	public void deleteFaqCategoryThatDoesNotExistTest() throws EntityNotFoundException, InvalidFormException {
		fullLoadDatabase();
		getFaqServices().removeCategory(100L);
	}
	
	/**
	 * Try to remove a FAQ Category that is flagged as the Top Questions category.
	 */
	@Test(expected=InvalidFormException.class)
	public void deleteTopFaqCategoryTest() throws EntityNotFoundException, InvalidFormException {
		fullLoadDatabase();
		getFaqServices().removeCategory(3L);
	}
	
	/**
	 * Try to remove a FAQ Category that still has FAQs tied to it.
	 */
	@Test(expected=InvalidFormException.class)
	public void deleteFaqCategoryThatStillHasFaqsTest() throws EntityNotFoundException, InvalidFormException {
		fullLoadDatabase();
		getFaqServices().removeCategory(2L);
	}
	
	/**
	 * Try to remove a FAQ Category that still has FAQs tied to it.
	 */
	@Test
	public void deleteFaqCategoryTest() throws EntityNotFoundException, InvalidFormException {
		fullLoadDatabase();
		
		FaqServices faqService = getFaqServices();
		
		assertTrue(faqService.getAllCategories().size() == 4);
		
		List<Faq> toBeRemoved = new ArrayList<>();
		for (Faq f : faqRepo.findAll()) {
			if (f.getCategory().getId() == 2L)
				toBeRemoved.add(f);
		}
		faqRepo.deleteAll(toBeRemoved);
		faqService.removeCategory(2L);
		
		assertTrue(faqService.getAllCategories().size() == 3);
	}
	
	/**
	 * Test make sure a new entry is created the first time a FAQ is viewed by a user in 
	 * the table that tracks it and that there is no entry to start with.
	 */
	@Test
	public void viewFaqForFirstTimeTest() throws EntityNotFoundException {
		fullLoadDatabase();
		
		Optional<FaqViewTracker> fvto = faqViewsRepo.findById(new FaqViewsId(5L, createDate()));
		assertFalse(fvto.isPresent());
		
		FaqServices faqService = getFaqServices();
		
		assertTrue(faqRepo.findById(5L).get().getTimesViewed() == 0);
		faqService.viewed(5L);
		assertTrue(faqRepo.findById(5L).get().getTimesViewed() == 1);
		
		FaqViewTracker fvt = faqViewsRepo.findById(new FaqViewsId(5L, createDate())).get();
		assertEquals(1, fvt.getCounter());
	}
	
	/**
	 * Test a FAQ that has been viewed before.  Make sure there are entries in that table 
	 * from before and that the count is incremented by 1 once called. 
	 */
	@Test
	public void viewFaqNotTheFirstTimeTest() throws EntityNotFoundException {
		fullLoadDatabase();
		
		FaqViewTracker fvt = faqViewsRepo.findById(new FaqViewsId(6L, createDate())).get();
		assertEquals(3, fvt.getCounter());
		
		FaqServices faqService = getFaqServices();
		
		assertEquals(3, faqRepo.findById(6L).get().getTimesViewed());
		faqService.viewed(6L);
		assertEquals(4, faqRepo.findById(6L).get().getTimesViewed());

		fvt = faqViewsRepo.findById(new FaqViewsId(6L, createDate())).get();
		assertEquals(4, fvt.getCounter());
	}
	
	private Date createDate() {		
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		cal.set(Calendar.HOUR_OF_DAY, 12);
		cal.set(Calendar.MINUTE, 00);
		cal.set(Calendar.SECOND, 00);
		cal.set(Calendar.MILLISECOND, 0);
		
		return cal.getTime();
	}
}
