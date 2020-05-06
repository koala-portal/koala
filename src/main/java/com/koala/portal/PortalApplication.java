package com.koala.portal;

import com.koala.portal.models.Tool;
import com.koala.portal.repos.ToolRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

import com.koala.portal.exceptions.EntityNotFoundException;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.Faq;
import com.koala.portal.models.FaqCategory;
import com.koala.portal.repos.FaqCategoryRepo;
import com.koala.portal.services.FaqServices;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan("com.koala.portal.*")
public class PortalApplication {

	@Autowired
	private FaqServices faqServices;
	
	@Autowired
        private FaqCategoryRepo faqCategoryServices;
        
        @Autowired
        private ToolRepo toolRepo;    
	
	public static void main(String[] args) {
		SpringApplication.run(PortalApplication.class, args);
	}

	@EventListener
	public void onApplicationEvent(ContextRefreshedEvent event) {
		//Load some dummy data
		try {
			FaqCategory faqCategoryGeneral = new FaqCategory(0, "Top FAQs", "The top FAQs as determined by the users of KOALA.", true);
			faqCategoryServices.save(faqCategoryGeneral);
			
			FaqCategory faqCategorySal = new FaqCategory(0, "SAL", "General question about what SAL is.", false);
			faqCategoryServices.save(faqCategorySal);
			
			FaqCategory faqCategoryU = new FaqCategory(0, "U##", "General question about what U## is.", false);
			faqCategoryServices.save(faqCategoryU);
			
			Faq f = new Faq(	0, 
							"How Do I Submit Something", 
							"In order to be compliant with that stuff you have to do you are required to register with K##.", 
							"Go to this <a href=\"\">URL</a> and fill out the form and hit submit.", 
							null, 
							0,
							faqCategorySal);
			faqServices.create(f);
			
			f = new Faq(	0, 
						"How Do I Track a Registration", 
						"I registered my system with K## several days ago.  How do I see what it's status is.", 
						"Click the who knows what tab and you'll see its status there.", 
						null, 
						0,
						faqCategoryU);
			faqServices.create(f);
			faqServices.viewed(f.getId());
			faqServices.viewed(f.getId());
			
			f = new Faq(	0, 
						"Do I Actually Have to Do This", 
						"Do I actually have to jump through these hoops.", 
						"Yup.", 
						null, 
						0,
						faqCategorySal);
			faqServices.create(f);
                        faqServices.viewed(f.getId());
                        
                        toolRepo.saveAll(Arrays.asList(
                                new Tool(
                                        "Google",
                                        "Massively popular search engine",
                                        58105679288L,
                                        true,
                                        "www.google.com"
                                ),
                                new Tool(
                                        "Bing",
                                        "Massively unpopular search engine",
                                        8L,
                                        false,
                                        "www.bing.com"
                                        ),
                                new Tool(
                                        "WinRAR",
                                        "Ubiquitous archiving tool",
                                        5896568L,
                                        true,
                                        "www.rarlab.com"
                                ),
                                new Tool(
                                        "Twitter",
                                        "A place where people post",
                                        12353567L,
                                        false,
                                        "www.twitter.com"
                                )
                        ));

		} catch (InvalidFormException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (EntityNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        }
        
        @Bean
        public WebMvcConfigurer corsConfigurer() {`
            return new WebMvcConfigurer() {
                @Override
                public void addCorsMappings(CorsRegistry registry) {
                    registry.addMapping("/api/**")
                            .allowedOrigins("http://localhost:4200")
                            .allowCredentials(true)
                            .allowedMethods("GET", "PUT", "POST", "DELETE", "OPTIONS");
                }
            };
        }
}
