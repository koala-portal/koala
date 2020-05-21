package com.koala.portal.services;

import java.util.List;

import com.koala.portal.domain.form.FormAction;
import com.koala.portal.domain.form.FormStatus;
import com.koala.portal.exceptions.EntityNotFoundException;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.Note;
import com.koala.portal.models.UamForm;
import com.koala.portal.models.UserDetails;

public interface UamFormServices {
	public UamForm get(long id, UserDetails user) throws InvalidFormException, EntityNotFoundException;
	public UamForm create(String assigneeId, UserDetails user);
	
	public List<UamForm> getAll(UserDetails user) throws InvalidFormException;
	public List<UamForm> getAll(UserDetails user, FormStatus status) throws InvalidFormException;
	
	public void addNote(UserDetails user, Note note) throws InvalidFormException;
	public void performAction(long id, FormAction action, UserDetails user) throws EntityNotFoundException, InvalidFormException;
	public void update(UamForm uamForm, UserDetails user) throws EntityNotFoundException, InvalidFormException;
	
}
