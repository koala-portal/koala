package com.koala.portal.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.koala.portal.models.FaqViewTracker;
import com.koala.portal.models.FaqViewsId;

@Repository
public interface FaqViewsRepo extends CrudRepository<FaqViewTracker, FaqViewsId> {

	
}
