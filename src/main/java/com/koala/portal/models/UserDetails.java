package com.koala.portal.models;

import java.io.Serializable;

import com.koala.portal.domain.PortalRoles;

public class UserDetails implements Serializable {
	private String userName;
	private String userCreds;
	private PortalRoles role;
	
	public UserDetails() {}
	
	public UserDetails(String userName, String userCreds, PortalRoles role) {
		setUserName(userName);
		setUserCreds(userCreds);
		setRole(role);
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserCreds() {
		return userCreds;
	}

	public void setUserCreds(String userCreds) {
		this.userCreds = userCreds;
	}

	public PortalRoles getRole() {
		return role;
	}

	public void setRole(PortalRoles role) {
		this.role = role;
	}
}
