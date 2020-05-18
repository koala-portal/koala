package com.koala.portal.services;

import com.koala.portal.exceptions.EntityNotFoundException;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.Tool;

import java.util.List;

public interface ToolServices {

    Tool findById(Long id) throws EntityNotFoundException;

    List<Tool> findAll();

    Tool save(Tool tool) throws InvalidFormException;

    Tool update(Tool tool) throws InvalidFormException, EntityNotFoundException;

    void deleteById(Long id) throws EntityNotFoundException;
}
