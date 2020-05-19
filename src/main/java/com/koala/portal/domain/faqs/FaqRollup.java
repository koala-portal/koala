package com.koala.portal.domain.faqs;

import com.koala.portal.models.Faq;

public class FaqRollup {
	private Faq faq;
	private long totalViews;
	
	public FaqRollup() {
		
	}
	
	public FaqRollup(Faq faq, long totalViews) {
		this.faq = faq;
		this.totalViews = totalViews;
	}

	public Faq getFaq() {
		return faq;
	}

	public void setFaq(Faq faq) {
		this.faq = faq;
	}

	public long getTotalViews() {
		return totalViews;
	}

	public void setTotalViews(long totalViews) {
		this.totalViews = totalViews;
	}
}
