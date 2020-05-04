package com.koala.portal.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.koala.portal.models.FaqCategory;

@Repository
public interface FaqCategoryRepo extends CrudRepository<FaqCategory, Long> { }
