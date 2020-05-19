package com.koala.portal.models;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Transient;

import com.koala.portal.domain.notes.NoteCategory;

import io.swagger.annotations.ApiModelProperty;

@Entity
@SuppressWarnings("serial")
public class Note implements Serializable {
	
	@ApiModelProperty(notes = "The auto-generated ID of the Note.  This will be set by the system and not the client.", allowEmptyValue=true, dataType="Long")
	private long id;

	@ApiModelProperty(notes = "The ID of the entity that this note maps to.", allowEmptyValue=false)
    private long entityId;
	
	@ApiModelProperty(notes = "The category the note falls under.", allowEmptyValue=false)
    private NoteCategory category;
	
	@ApiModelProperty(notes = "The body of the note.", allowEmptyValue=false, dataType="String/CLOB")
	private String text;
	
	@ApiModelProperty(notes = "Who created the note.  This will be set by the system, and any values set by the client ignored.", allowEmptyValue=false, dataType="String")
	private String createdBy;
		
	@ApiModelProperty(notes = "The date the note was created or updated.  This will only be set by the system, and any values set by the client ignored.", allowEmptyValue=true, dataType="Date")
	private Date created;
	
	@ApiModelProperty(notes = "Can people outside of the organization view this note.", allowEmptyValue=false, dataType="Boolean")
	private boolean publicViewable;
	
	@ApiModelProperty(notes = "Can the logged in person edit this note.  This value is set by the system.", allowEmptyValue=false, dataType="Boolean")
	private boolean editable;	
		
	public Note() {/* Base Constructor */}
	
	public Note(long entityId, String text, boolean isPublic) {
		setEntityId(entityId);
		setText(text);
		setPublicViewable(isPublic);
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}

	@Column(nullable=false)
	public long getEntityId() {
		return entityId;
	}

	public void setEntityId(long entityId) {
		this.entityId = entityId;
	}

	@Column(nullable=false)
	public NoteCategory getCategory() {
		return category;
	}

	public void setCategory(NoteCategory category) {
		this.category = category;
	}

	@Lob
	@Column(nullable = false)
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	@Column(nullable=false)
	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	@Column(nullable=false)
	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	@Column(nullable=false)
	public boolean isPublicViewable() {
		return publicViewable;
	}

	public void setPublicViewable(boolean publicViewable) {
		this.publicViewable = publicViewable;
	}

	@Transient
	public boolean isEditable() {
		return editable;
	}

	public void setEditable(boolean editable) {
		this.editable = editable;
	}	
}