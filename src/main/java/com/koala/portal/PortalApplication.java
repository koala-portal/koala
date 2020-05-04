package com.koala.portal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.Faq;
import com.koala.portal.services.FaqServices;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan("com.koala.portal.*")
public class PortalApplication {

	@Autowired
	private FaqServices faqServices;
	
	public static void main(String[] args) {
		SpringApplication.run(PortalApplication.class, args);
	}

	@EventListener
	public void onApplicationEvent(ContextRefreshedEvent event) {
		//Load some dummy data
		try {
			Faq f = new Faq(	0, 
							"How Do I Submit Something", 
							"In order to be compliant with that stuff you have to do you are required to register with K##.", 
							"Go to this <a href=\"\">URL</a> and fill out the form and hit submit.", 
							null, 
							0);
			faqServices.create(f);
			
			f = new Faq(	0, 
						"How Do I Track a Registration", 
						"I registered my system with K## several days ago.  How do I see what it's status is.", 
						"Click the who knows what tab and you'll see its status there.", 
						null, 
						0);
			faqServices.create(f);
			
			f = new Faq(	0, 
						"Do I Actually Have to Do This", 
						"Do I actually have to jump through these hoops.", 
						"Yup.", 
						null, 
						0);
			faqServices.create(f);

		} catch (InvalidFormException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
