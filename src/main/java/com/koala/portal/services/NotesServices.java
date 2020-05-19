package com.koala.portal.services;

import java.util.List;

import com.koala.portal.domain.notes.NoteCategory;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.Note;
import com.koala.portal.models.UserDetails;

public interface NotesServices {

	public Note save(Note note, UserDetails user) throws InvalidFormException;
	
	public List<Note> getAll(NoteCategory category, Long entityId, UserDetails user);

}
