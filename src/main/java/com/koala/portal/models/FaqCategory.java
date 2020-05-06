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
	private String description;
	
	@ApiModelProperty(notes = "A special designation that contains the top questions regardless of what other categories they fall into.  This cannot be the direct category of any FAQ.", allowEmptyValue=true, dataType="boolean")
	private boolean topQuestionsCategory;

	public FaqCategory() {
		// TODO Auto-generated constructor stub
	}
	
	public FaqCategory(long id, String title, String desc, boolean isTopQuestionsCategory) {
		setId(id);
		setTitle(title);
		setDescription(desc);
		setTopQuestionsCategory(isTopQuestionsCategory);
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	@Column(nullable = false)
	public boolean isTopQuestionsCategory() {
		return topQuestionsCategory;
	}

	public void setTopQuestionsCategory(boolean topQuestionsCategory) {
		this.topQuestionsCategory = topQuestionsCategory;
	}
}
