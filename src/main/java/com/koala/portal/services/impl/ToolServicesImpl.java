package com.koala.portal.services.impl;

import com.koala.portal.constants.ErrorMessages;
import com.koala.portal.exceptions.EntityNotFoundException;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.Tool;
import com.koala.portal.repos.ToolRepo;
import com.koala.portal.services.ToolServices;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ToolServicesImpl implements ToolServices {

    @Autowired
    ToolRepo toolRepo;

    @Override
    public Tool findById(Long id) throws EntityNotFoundException {
        return toolRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Tool", Long.toString(id)));
    }

    @Override
    public List<Tool> findAll() {
        return StreamSupport
                .stream(toolRepo.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Tool save(Tool tool) throws InvalidFormException {
        if (tool.getId() != null) {
            throw new InvalidFormException(String.format(ErrorMessages.FIELD_AUTO_GENERATED, "id"), String.format(ErrorMessages.DEMAND_NO_VALUE, "id"));
        }

        validateTool(tool);
        return toolRepo.save(tool);
    }

    @Override
    public Tool update(Tool tool) throws InvalidFormException, EntityNotFoundException {
        if (!toolRepo.existsById(tool.getId())) {
            throw new EntityNotFoundException("Tool", Long.toString(tool.getId()));
        }

        validateTool(tool);
        return toolRepo.save(tool);
    }

    private static void validateTool(Tool tool) throws InvalidFormException {
        if (StringUtils.isEmpty(tool.getName())) {
            throw new InvalidFormException(String.format(ErrorMessages.BLANK_REQUIRED, "name"), String.format(ErrorMessages.DEMAND_VALID, "name"));
        } else if (StringUtils.isEmpty(tool.getDescription())) {
            throw new InvalidFormException(String.format(ErrorMessages.BLANK_REQUIRED, "description"), String.format(ErrorMessages.DEMAND_VALID, "description"));
        } else if (StringUtils.isEmpty(tool.getUrl())) {
            throw new InvalidFormException(String.format(ErrorMessages.BLANK_REQUIRED, "url"), String.format(ErrorMessages.DEMAND_VALID, "url"));
        } else if (tool.getNumUsers() == null) {
            throw new InvalidFormException(String.format(ErrorMessages.NULL_REQUIRED, "numUsers"), String.format(ErrorMessages.DEMAND_VALID, "numUsers"));
        }
    }
}
