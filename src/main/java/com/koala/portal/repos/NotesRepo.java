package com.koala.portal.repos;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.koala.portal.domain.notes.NoteCategory;
import com.koala.portal.models.Note;

@Repository
public interface NotesRepo extends CrudRepository<Note, Long> {
	public List<Note> findByEntityIdAndCategoryOrderByCreated(long parentId, NoteCategory category);
}
