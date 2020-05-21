package com.koala.portal.services.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.koala.portal.services.NameResolutionService;

/**
 * This is all dummy code, and there should be a new implementation of this class once this code gets moved to the other network.
 *  - John Adams has the "ADMIN" role (a member of KOALA, can do almost anything in the app)
 *  - Sally Patterson has the "Partner" role (external person, not a member of KOALA)
 *  - Jimmy Empanada has the "Employee" role (a member of KOALA, but not privileged and can pretty much only read things)
 */
@Service
public class NameResolutionServiceImpl implements NameResolutionService {
	@Override
	public String resolveToLabel(String userId) {
		if (StringUtils.isBlank(userId)) {
			return null;
		} else if (StringUtils.equalsIgnoreCase(userId, "KOALA-ADMIN")) {
			return "John Adams";
		} else if (StringUtils.equalsIgnoreCase(userId, "PARTNER") || StringUtils.equalsIgnoreCase(userId, "KOALA-VIEWER")) {
			return "Sally Patterson";
		} else if (StringUtils.equalsIgnoreCase(userId, "KOALA-EMPLOYEE")) {
			return "Jimmy Empanada";
		} else {
			return userId;
		}
	}
}
