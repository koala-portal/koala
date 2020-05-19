package com.koala.portal.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.koala.portal.models.UamForm;

@Repository
public interface UamFormRepo extends CrudRepository<UamForm, Long> {
	
}
