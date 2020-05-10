package com.koala.portal.daos.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.koala.portal.daos.FaqDao;
import com.koala.portal.domain.faqs.FaqRollup;
import com.koala.portal.models.Faq;

@Service
public class FaqDaoImpl implements FaqDao {

    @PersistenceContext
    private EntityManager em;

	@Override
	public List<Faq> getTopFaqs(Date from, Date to, int limit) {
		List<Faq> topFaqs = new ArrayList<>();
		System.out.println("Pulling back " + from + " to " + to + ".");
		Query query = em.createQuery(	"SELECT new com.koala.portal.domain.faqs.FaqRollup(f, sum(fvt.counter) as c) " + 
										"FROM Faq f inner join FaqViewTracker fvt on fvt.faqViewsId.idFaq=f.id " + 
										"WHERE fvt.faqViewsId.day BETWEEN :from AND :to " + 
										"GROUP BY fvt.faqViewsId.idFaq " + 
										"ORDER BY c desc");
		query.setParameter("from", from);
		query.setParameter("to", to);
		
		List<FaqRollup> resultList = query.getResultList();
		
		int counter = 0;
		for (FaqRollup f : resultList) {
			topFaqs.add(f.getFaq());
			counter++;
			if (counter == limit)
				break;
		}
		
		em.close();

		return topFaqs;
	}

}
