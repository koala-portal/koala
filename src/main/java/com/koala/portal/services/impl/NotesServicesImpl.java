package com.koala.portal.services.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.koala.portal.domain.notes.NoteCategory;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.Note;
import com.koala.portal.models.UserDetails;
import com.koala.portal.repos.NotesRepo;
import com.koala.portal.services.NotesServices;

@Service
public class NotesServicesImpl implements NotesServices {
	
	@Autowired
	private NotesRepo notesRepo;

	@Override
	public List<Note> getAll(NoteCategory category, Long entityId, UserDetails user) {
		
		for (Note n : Lists.newArrayList(notesRepo.findAll())) {
			System.out.println(n.getText() + "  " + n.getCreatedBy() + "  " + n.getCategory() + "   " + n.getEntityId());
		}
		return fileterAndAugmentNotes(	notesRepo.findByEntityIdAndCategoryOrderByCreated(entityId, category), 
										user);
	}
	
	/**
	 * Create a new list based on:
	 *  - Is the user making the request the owner of the note OR a KOALA employeee
	 *  - Is the note public or private (if private anyone in KOALA can see it)
	 */
	private List<Note> fileterAndAugmentNotes(List<Note> notes, UserDetails user) {
		List<Note> newNotesList = new ArrayList<>();

		for (Note n : notes) {
			if (	user.getRole().isInternalKoalaRole() || 
				n.isPublicViewable() || 
				n.getCreatedBy().equals(user.getUserCreds()))
				newNotesList.add(augmentNote(n, user));
		}
		
		return newNotesList;
	}
	
	private Note augmentNote(Note note, UserDetails user) {
		note.setEditable(note.getCreatedBy().equals(user.getUserCreds()));
		return note;
	}

	@Override
	public Note save(Note note, UserDetails user) throws InvalidFormException {
		//@TODO - Valid note
		
		
		note.setCreatedBy(user.getUserCreds());
		note.setCreated(new Date());
		
		return notesRepo.save(note);
	}

}
