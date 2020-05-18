package com.koala.portal.daos;

import java.util.Date;
import java.util.List;

import com.koala.portal.models.Faq;

public interface FaqDao {
	public List<Faq> getTopFaqs(Date from, Date to, int limit);
}
