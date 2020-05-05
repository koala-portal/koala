package com.koala.portal.repos;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.koala.portal.models.FaqCategory;

@Repository
public interface FaqCategoryRepo extends CrudRepository<FaqCategory, Long> {

	public List<FaqCategory> findAllByOrderBySortOrderAsc();
	
	@Query(value = "SELECT max(fc.sortOrder)+1 FROM FaqCategory fc")
	public int getNextSortOrderValue();

}
