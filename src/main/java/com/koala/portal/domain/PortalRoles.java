package com.koala.portal.domain;

public enum PortalRoles {
	PARTNER(false),
	EMPLOYEE(true),
	ADMIN(true);
	
	private final boolean internalKoalaRole;
	
	private PortalRoles(boolean isInternalKoalaRole) {
		this.internalKoalaRole = isInternalKoalaRole;
	}

	public boolean isInternalKoalaRole() {
		return internalKoalaRole;
	}
}
