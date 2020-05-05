package com.koala.portal.services.impl;

import com.koala.portal.exceptions.EntityNotFoundException;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.Tool;
import com.koala.portal.repos.ToolRepo;
import com.koala.portal.services.ToolServices;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class ToolServicesImpl implements ToolServices {

    ToolRepo toolRepo;

    @Override
    public Tool findById(Long id) throws EntityNotFoundException {
        return toolRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Tool", id.toString()));
    }

    @Override
    public List<Tool> findAll() {
        return StreamSupport
                .stream(toolRepo.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Tool save(Tool tool) {
        return toolRepo.save(tool);
    }

    @Override
    public Tool update(Tool tool) throws InvalidFormException, EntityNotFoundException {
        if (!toolRepo.existsById(tool.getId())) {
            throw new EntityNotFoundException("Tool", tool.getId() != null ? tool.getId().toString() : "null");
        }
        return toolRepo.save(tool);
    }
}
