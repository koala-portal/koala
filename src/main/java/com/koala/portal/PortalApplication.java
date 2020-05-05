package com.koala.portal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.Faq;
import com.koala.portal.models.FaqCategory;
import com.koala.portal.repos.FaqCategoryRepo;
import com.koala.portal.services.FaqServices;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@ComponentScan("com.koala.portal.*")
public class PortalApplication {

	@Autowired
	private FaqServices faqServices;

	@Autowired
	private FaqCategoryRepo faqCategoryServices;

	public static void main(String[] args) {
		SpringApplication.run(PortalApplication.class, args);
	}

	@EventListener
	public void onApplicationEvent(ContextRefreshedEvent event) {
		//Load some dummy data
		try {
			int sortVal = 1;
			FaqCategory faqCategoryGeneral = new FaqCategory(0, "General", "General question about what K## is.", true, sortVal++);
			faqCategoryServices.save(faqCategoryGeneral);

			FaqCategory faqCategorySal = new FaqCategory(0, "SAL", "General question about what SAL is.", false, sortVal++);
			faqCategoryServices.save(faqCategorySal);

			Faq f = new Faq(	0,
							"How Do I Submit Something",
							"In order to be compliant with that stuff you have to do you are required to register with K##.",
							"Go to this <a href=\"\">URL</a> and fill out the form and hit submit.",
							null,
							0,
							faqCategoryGeneral);
			faqServices.create(f);

			f = new Faq(	0,
						"How Do I Track a Registration",
						"I registered my system with K## several days ago.  How do I see what it's status is.",
						"Click the who knows what tab and you'll see its status there.",
						null,
						0,
						faqCategoryGeneral);
			faqServices.create(f);

			f = new Faq(	0,
						"Do I Actually Have to Do This",
						"Do I actually have to jump through these hoops.",
						"Yup.",
						null,
						0,
						faqCategorySal);
			faqServices.create(f);

		} catch (InvalidFormException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**").allowedOrigins("http://localhost:4200").allowCredentials(true);
			}
		};
	}
}
