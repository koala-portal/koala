package com.koala.portal.models;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.koala.portal.domain.form.FormAction;
import com.koala.portal.domain.form.FormStatus;
import com.koala.portal.domain.history.EntityType;

import io.swagger.annotations.ApiModelProperty;

@Entity
@SuppressWarnings("serial")
public class HistoryEntry implements Serializable {
	
	@ApiModelProperty(notes = "The auto-generated ID of the history entry.  This will be set by the system and not the client.", allowEmptyValue=true, dataType="Long")
	private long id;

	@ApiModelProperty(notes = "The ID of the entity that this note maps to.", allowEmptyValue=false)
    private long entityId;
	
	@ApiModelProperty(notes = "The entity type the history entry ties to.", allowEmptyValue=false)
    private EntityType entityType;
	
	@ApiModelProperty(notes = "The original status of the entity.", allowEmptyValue=false, dataType="FormStatus")
	private FormStatus orgStatus;

	@ApiModelProperty(notes = "The action performed on the entity.", allowEmptyValue=false, dataType="FormAction")
	private FormAction action;
	
	@ApiModelProperty(notes = "The new status of the entity.", allowEmptyValue=false, dataType="FormStatus")
	private FormStatus newStatus;
	
	@ApiModelProperty(notes = "Who did the action.  This will be set by the system, and any values set by the client ignored.", allowEmptyValue=false, dataType="String")
	private String doneBy;
		
	@ApiModelProperty(notes = "When this action was done.  This will only be set by the system, and any values set by the client ignored.", allowEmptyValue=true, dataType="Date")
	private Date doneOn;
			
	public HistoryEntry() {/* Base Constructor */}
	
	public HistoryEntry(long entityId, EntityType entityType, FormStatus orgStatus, FormAction action, FormStatus newStatus, String doneBy, Date doneOn) {
		setEntityId(entityId);
		setEntityType(entityType);
		setOrgStatus(orgStatus);
		setAction(action);
		setNewStatus(newStatus);
		setDoneBy(doneBy);
		setDoneOn(doneOn);
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
	public EntityType getEntityType() {
		return entityType;
	}

	public void setEntityType(EntityType entityType) {
		this.entityType = entityType;
	}

	@Column(nullable=false)
	public FormStatus getOrgStatus() {
		return orgStatus;
	}

	public void setOrgStatus(FormStatus orgStatus) {
		this.orgStatus = orgStatus;
	}

	@Column(nullable=false)
	public FormAction getAction() {
		return action;
	}

	public void setAction(FormAction action) {
		this.action = action;
	}

	@Column(nullable=false)
	public FormStatus getNewStatus() {
		return newStatus;
	}

	public void setNewStatus(FormStatus newStatus) {
		this.newStatus = newStatus;
	}

	@Column(nullable=false)
	public String getDoneBy() {
		return doneBy;
	}

	public void setDoneBy(String doneBy) {
		this.doneBy = doneBy;
	}

	@Column(nullable=false)
	public Date getDoneOn() {
		return doneOn;
	}

	public void setDoneOn(Date doneOn) {
		this.doneOn = doneOn;
	}

}