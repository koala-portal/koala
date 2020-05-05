package com.koala.portal.repos;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.koala.portal.models.Faq;
import com.koala.portal.models.FaqCategory;

@Repository
public interface FaqRepo extends CrudRepository<Faq, Long> {

	public List<Faq> findByCategoryOrderByTitle(FaqCategory fc);
	
}
