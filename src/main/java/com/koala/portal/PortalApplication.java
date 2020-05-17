package com.koala.portal;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

import com.koala.portal.domain.PortalRoles;
import com.koala.portal.domain.form.FormAction;
import com.koala.portal.exceptions.EntityNotFoundException;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.Faq;
import com.koala.portal.models.FaqCategory;
import com.koala.portal.models.Note;
import com.koala.portal.models.UamForm;
import com.koala.portal.models.UserDetails;
import com.koala.portal.services.FaqServices;
import com.koala.portal.services.UamFormServices;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan("com.koala.portal.*")
public class PortalApplication {

	@Autowired
	private FaqServices faqServices;

	@Autowired
	private UamFormServices uamFormServices;
			
	public static void main(String[] args) {
		SpringApplication.run(PortalApplication.class, args);
	}

	@EventListener
	public void onApplicationEvent(ContextRefreshedEvent event) {
		//Load some dummy data
		try {
			
			FaqCategory faqCategoryGeneral = new FaqCategory(0, "Top FAQs", "The top FAQs as determined by you, the users of KOALA.", true);
			faqServices.create(faqCategoryGeneral);
			
			FaqCategory faqCategorySal = new FaqCategory(0, "SAL", "General question about what SAL is.", false);
			faqServices.create(faqCategorySal);
			
			FaqCategory faqCategoryU = new FaqCategory(0, "U##", "General question about what U## is.", false);
			faqServices.create(faqCategoryU);
			
			FaqCategory faqCategoryAto = new FaqCategory(0, "K## in the ATO Process", "General question where K## fits into your A&A and ATO process.", false);
			faqServices.create(faqCategoryAto);
			
			Faq f = new Faq(	0, 
							"Do I Need to Be in SAL", 
							"Maybe, I don't know.  What type of thing are you.", 
							"Look at this <a href=\"http://google.com\" target=\"_blank\">logic chart</a> and follow the path.", 
							new Date(), 
							0,
							faqCategorySal);
			faqServices.create(f);
			
			f = new Faq(	0, 
						"How Do I Register in SAL", 
						"You do this through the registration section of SAL.", 
						"Go to this <a href=\"http://google.com\" target=\"_blank\">URL</a> and fill out the form and hit submit.", 
						new Date(), 
						0,
						faqCategorySal);
			faqServices.create(f);
			faqServices.viewed(f.getId());
			faqServices.viewed(f.getId());
			faqServices.viewed(f.getId());
			
			f = new Faq(	0, 
					"Can I Waiver My App", 
					"I don't believe that my application or group can do what SAL wants us to do.", 
					"Put on your big boy/girl pants and figure it out.", 
					new Date(), 
					0,
					faqCategorySal);
			faqServices.create(f);
			faqServices.viewed(f.getId());
			
			// ---------------------------------------------------------------------------------------------------------------
			
			f = new Faq(	0, 
						"What is U##", 
						"This is something that may not apply to you, but it's on you to reach out to us and find out.", 
						"Go to the KOALA <a href=\"/tickets\" target=\"_blank\">tickets</a> section of KOALA and fill out a ticket.",
						null, 
						0,
						faqCategoryU);
			faqServices.create(f);
			faqServices.viewed(f.getId());
			faqServices.viewed(f.getId());

			f = new Faq(	0, 
					"Who Installs U##", 
					"Is this something we install or do you guys install it for us.", 
					"We got this, we will reach out to you when and set up a time for us to do it.",
					null, 
					0,
					faqCategoryU);
			faqServices.create(f);
			faqServices.viewed(f.getId());
			
			// ---------------------------------------------------------------------------------------------------------------
			
			f = new Faq(	0, 
						"What is K## Role in my A&A", 
						"Blah blah blah.", 
						"Yup, blah blah blah", 
						null, 
						0,
						faqCategoryAto);
			faqServices.create(f);
			faqServices.viewed(f.getId());
			
			f = new Faq(	0, 
						"Can K## Actually Block/Stop Anything", 
						"Ya, you better believe we can.", 
						"Just work with us and we'll work with you.  We're not unreasonable.", 
						null, 
						0,
						faqCategoryAto);
			faqServices.create(f);
			faqServices.viewed(f.getId());

		} catch (InvalidFormException | EntityNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		try {
			UamForm form = new UamForm();
			UserDetails user = new UserDetails("John Doe", "KOALA-VIEWER", PortalRoles.PARTNER);
			
			form.setOrganization("COM/APACHE/KAFKA");
			form.setaAndANum("ABC/123");
			
			UamForm newForm = uamFormServices.save(user, form);
						
			Note note = new Note(	newForm.getId(),
									"Mock Random Text from Non-KOALA person", 
									true);			
			uamFormServices.addNote(user, note);
			
			UserDetails adminUser = new UserDetails("John Doe", "KOALA-ADMIN", PortalRoles.ADMIN);
			note = new Note(	newForm.getId(),
					"Mock Random Text from KOALA Admin", 
					true);			
			uamFormServices.addNote(adminUser, note);
			
			
			uamFormServices.performAction(	newForm.getId(), 
											FormAction.SUBMIT, 
											user);
			
		} catch (InvalidFormException | EntityNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
