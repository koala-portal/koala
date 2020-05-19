package com.koala.portal.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
@SuppressWarnings("serial")
public class FaqViewTracker implements Serializable {
	
    @EmbeddedId
    private FaqViewsId faqViewsId;

	@Column
	private int counter;
	
	public FaqViewTracker() {}
	
	public FaqViewTracker(FaqViewsId faqViewsId) {
		this.faqViewsId = faqViewsId;
	}

	public FaqViewsId getFaqViewsId() {
		return faqViewsId;
	}

	public void setFaqViewsId(FaqViewsId faqViewsId) {
		this.faqViewsId = faqViewsId;
	}
	
	public int getCounter() {
		return counter;
	}
	public void setCounter(int counter) {
		this.counter = counter;
	}
}
