package com.koala.portal.services;

import java.util.List;

import com.koala.portal.domain.form.FormStatus;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.UamForm;
import com.koala.portal.models.UserDetails;

public interface UamFormServices {
	public UamForm save(UserDetails user, UamForm form) throws InvalidFormException;
	public List<UamForm> getAll(UserDetails user) throws InvalidFormException;
	public List<UamForm> getAll(UserDetails user, FormStatus status) throws InvalidFormException;
}
