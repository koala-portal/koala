package com.koala.portal.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.koala.portal.models.Faq;

@Repository
public interface FaqRepo extends CrudRepository<Faq, Long> { }
