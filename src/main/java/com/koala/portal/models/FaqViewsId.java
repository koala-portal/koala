package com.koala.portal.models;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Embeddable;

@SuppressWarnings("serial")
@Embeddable
public class FaqViewsId implements Serializable {	
	private long idFaq;
	private Date day;
	
	public FaqViewsId() {
		
	}
	
	public FaqViewsId(long idFaq, Date day) {
		this.idFaq = idFaq;
		this.day = day;
	}

	public long getIdFaq() {
		return idFaq;
	}

	public void setIdFaq(long idFaq) {
		this.idFaq = idFaq;
	}

	public Date getDay() {
		return day;
	}

	public void setDay(Date day) {
		this.day = day;
	}
}
