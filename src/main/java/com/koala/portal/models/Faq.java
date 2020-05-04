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

import io.swagger.annotations.ApiModelProperty;

@Entity
@SuppressWarnings("serial")
public class Faq implements Serializable {
	
	@ApiModelProperty(notes = "The auto-generated ID of the FAQ.  This will be set by the system and not the client.", allowEmptyValue=true, dataType="Long")
	private long id;
	
	@ApiModelProperty(notes = "The title of the FAQ and the thing that should draw the user in.", allowEmptyValue=false, dataType="String")
	private String title;
	
	@ApiModelProperty(notes = "A more in-depth description of what the FAQ is about.", allowEmptyValue=false, dataType="String/CLOB")
	private String desc;
	
	@ApiModelProperty(notes = "Information for the user that will help them resolve the issue or direct them on where to go to learn more.", allowEmptyValue=false, dataType="String/CLOB")
	private String info;
	
	@ApiModelProperty(notes = "The date the FAQ was created or updated.  This will only be set by the system, and any values set by the client ignored.", allowEmptyValue=true, dataType="Date")
	private Date updated;
	
	@ApiModelProperty(notes = "How many times has a user/client looked at this specific FAQ.", allowEmptyValue=true, dataType="Long")
	private int timesViewed;
	
	public Faq() {/* Base Constructor */}
	
	public Faq(long id, String title, String desc, String info, Date updated, int timesViewed) {
		setId(id);
		setTitle(title);
		setDesc(desc);
		setUpdated(updated);
		setInfo(info);
		setTimesViewed(timesViewed);
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
	
	@Lob
	@Column(nullable = false, length=4000)
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}

	@Column(nullable = false)
	public Date getUpdated() {
		return updated;
	}

	public void setUpdated(Date updated) {
		this.updated = updated;
	}

	@Lob
	@Column(nullable = false, length=4000)
	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	@Column
	public int getTimesViewed() {
		return timesViewed;
	}

	public void setTimesViewed(int timesViewed) {
		this.timesViewed = timesViewed;
	}
	
	@Transient
	public void viewed() {
		this.setTimesViewed(getTimesViewed()+1);
	}
}