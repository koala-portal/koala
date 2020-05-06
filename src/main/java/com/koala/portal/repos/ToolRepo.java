package com.koala.portal.repos;

import com.koala.portal.models.Tool;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToolRepo extends CrudRepository<Tool, Long> {
}
