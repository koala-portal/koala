package com.koala.portal.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;

import com.koala.portal.domain.form.FormAction;
import com.koala.portal.domain.form.FormStatus;

import io.swagger.annotations.ApiModelProperty;

@Entity
@SuppressWarnings("serial")
public class UamForm implements Serializable {
	
	@ApiModelProperty(notes = "The auto-generated ID of the UAM form.  This will be set by the system and not the client.", allowEmptyValue=true, dataType="Long")
	private long id;
	
	@ApiModelProperty(notes = "The ID of the user who owns this form and is responsible for filling it out.", allowEmptyValue=false, dataType="String")
	private String ownerId;
	
	@ApiModelProperty(notes = "The date and time the form was created.  This value should not be submitted and will be filled in on the back end.", allowEmptyValue=true, dataType="Date")
	private Date created;
	@ApiModelProperty(notes = "The DN of who created this form.  This value should not be submitted and will be filled in on the back end.", allowEmptyValue=true, dataType="String")
	private String createdBy;
	
	@ApiModelProperty(notes = "The date and time the form was updated.  This value should not be submitted and will be filled in on the back end.", allowEmptyValue=true, dataType="Date")
	private Date updated;
	@ApiModelProperty(notes = "The DN of who updated this form.  This value should not be submitted and will be filled in on the back end.", allowEmptyValue=true, dataType="String")
	private String updatedBy;

	@ApiModelProperty(notes = "The current status of the form.", allowEmptyValue=true, dataType="FormStatus")
	private FormStatus status;
	
	@ApiModelProperty(notes = "The organization for the system that is being submitted.", allowEmptyValue=false, dataType="String")
	private String organization;
	
	@ApiModelProperty(notes = "The A&A number for your system.", allowEmptyValue=true, dataType="String")
	private String authAndAccredNumber;
	
	//These are all transient values, and should be calculated in the service layer depending on who the user is, not stored in the database.
	@ApiModelProperty(notes = "Is the person who was assigned this form the same person who is now requesting it.", allowEmptyValue=true, dataType="Boolean")
	private boolean ownerOfForm;	
	@ApiModelProperty(notes = "Can the person logged in edit/update this form.", allowEmptyValue=true, dataType="Boolean")
	private boolean editable;
	@ApiModelProperty(notes = "The human readable name of the person who created the form.", allowEmptyValue=true, dataType="String")
	private String createdByLabel;
	@ApiModelProperty(notes = "The human readable name of the person who last updated the form.", allowEmptyValue=true, dataType="String")
	private String updatedByLabel;
	@ApiModelProperty(notes = "The human readable name of the person who owns and is responsible for filling out the form.", allowEmptyValue=true, dataType="String")
	private String ownerLabel;
	
	@ApiModelProperty(notes = "Any and all notes tied to this form that the user is permitted to see.", allowEmptyValue=true, dataType="List of Notes")
	private List<Note> notes;
	
	@ApiModelProperty(notes = "The history of how this form moved through the process.", allowEmptyValue=true, dataType="List of HistoryEntries")
	private List<HistoryEntry> history;
	
	@ApiModelProperty(notes = "A list of actions the user is permitted to take on this form determined by their role and the status of the form.", allowEmptyValue=true, dataType="Set")
	private Set<FormAction> permittedActions;
		
	public UamForm() {/* Base Constructor */}
	
	public UamForm(long id) {
		setId(id);
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}

	@Column(nullable = false)
	public String getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}

	@Column(nullable = false)
	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	@Column(nullable = false)
	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	@Column(nullable = true)
	public Date getUpdated() {
		return updated;
	}

	public void setUpdated(Date updated) {
		this.updated = updated;
	}

	@Column(nullable = true)
	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
	
	@Column(nullable = false)
	public FormStatus getStatus() {
		return status;
	}

	public void setStatus(FormStatus status) {
		this.status = status;
	}

	@Column(nullable = true)
	public String getOrganization() {
		return organization;
	}

	public void setOrganization(String organization) {
		this.organization = organization;
	}

	@Column(nullable = true)
	public String getAuthAndAccredNumber() {
		return authAndAccredNumber;
	}

	public void setAuthAndAccredNumber(String authAndAccredNumber) {
		this.authAndAccredNumber = authAndAccredNumber;
	}

	@Transient
	public boolean isOwnerOfForm() {
		return ownerOfForm;
	}

	public void setOwnerOfForm(boolean ownerOfForm) {
		this.ownerOfForm = ownerOfForm;
	}

	@Transient
	public boolean isEditable() {
		return editable;
	}

	public void setEditable(boolean editable) {
		this.editable = editable;
	}

	@Transient
	public String getCreatedByLabel() {
		return createdByLabel;
	}

	public void setCreatedByLabel(String createdByLabel) {
		this.createdByLabel = createdByLabel;
	}

	@Transient
	public String getUpdatedByLabel() {
		return updatedByLabel;
	}

	public void setUpdatedByLabel(String updatedByLabel) {
		this.updatedByLabel = updatedByLabel;
	}

	@Transient
	public String getOwnerLabel() {
		return ownerLabel;
	}

	public void setOwnerLabel(String ownerLabel) {
		this.ownerLabel = ownerLabel;
	}

	@Transient
	public Set<FormAction> getPermittedActions() {
		if (null == permittedActions)
			this.permittedActions = new LinkedHashSet<>();		
		return permittedActions;
	}

	public void setPermittedActions(Set<FormAction> permittedActions) {
		this.permittedActions = permittedActions;
	}

	@Transient
	public List<Note> getNotes() {
		if (null == notes)
			notes = new ArrayList<>();
		
		return notes;
	}

	public void setNotes(List<Note> notes) {
		this.notes = notes;
	}

	@Transient
	public List<HistoryEntry> getHistory() {
		if (null == history)
			history = new ArrayList<>();
		return history;
	}

	public void setHistory(List<HistoryEntry> history) {
		this.history = history;
	}
}