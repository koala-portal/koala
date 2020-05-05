package com.koala.portal.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import io.swagger.annotations.ApiModelProperty;

@Entity
@SuppressWarnings("serial")
public class FaqCategory implements Serializable {

	@ApiModelProperty(notes = "The auto-generated ID of the FAQ category.  This will be set by the system and not the client.", allowEmptyValue=true, dataType="Long")
	private long id;
	
	@ApiModelProperty(notes = "The title of the FAQ category.", allowEmptyValue=false, dataType="String")
	private String title;
	
	@ApiModelProperty(notes = "A more in-depth description of what the FAQ category covers.", allowEmptyValue=false, dataType="String/CLOB")
	private String desc;
	
	@ApiModelProperty(notes = "If this is the category that should be loaded by default.  In theory only one row should have this value set to true.", allowEmptyValue=false, dataType="boolean")
	private boolean isDefaultLoadCategory;
	
	@ApiModelProperty(notes = "The order the categories should be returned in.  New FAQ categories will have this value created automattically and will be placed at the end.", allowEmptyValue=true, dataType="Integer")
	private int sortOrder;

	public FaqCategory() {
		// TODO Auto-generated constructor stub
	}
	
	public FaqCategory(long id, String title, String desc, boolean isDefaultLoadCategory, int sortOrder) {
		setId(id);
		setTitle(title);
		setDesc(desc);
		setDefaultLoadCategory(isDefaultLoadCategory);
		setSortOrder(sortOrder);
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	@Column(nullable = false, length=512)
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	@Column(nullable = false, length=4000)
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	
	@Column(nullable = false)
	public boolean isDefaultLoadCategory() {
		return isDefaultLoadCategory;
	}

	public void setDefaultLoadCategory(boolean isDefaultLoadCategory) {
		this.isDefaultLoadCategory = isDefaultLoadCategory;
	}
	
	@Column
	public int getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(int sortOrder) {
		this.sortOrder = sortOrder;
	}
}
