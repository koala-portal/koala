package com.koala.portal.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.koala.portal.domain.PortalRoles;

public class User implements UserDetails {

	private boolean enabled;
	private boolean accountNonLocked;
	private String username;
	private String userLabel;
	private List<GrantedAuthority> roles = new ArrayList<>();
	
	public void addRole(PortalRoles role) {
		roles.add(new SimpleGrantedAuthority(role.name()));
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return roles;
	}

	@Override
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public boolean isAccountNonLocked() {
		return accountNonLocked;
	}
	public void setAccountNonLocked(boolean accountNonLocked) {
		this.accountNonLocked = accountNonLocked;
	}

	@Override
	public boolean isEnabled() {
		return enabled;
	}	
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	// --- For now we just leave these hard-coded to these default values since they don't apply where this code is going
	@Override
	public boolean isCredentialsNonExpired() { return true; }

	@Override
	public boolean isAccountNonExpired() { return true; }
	
	@Override
	public String getPassword() { return null; }

	public String getUserLabel() {
		return userLabel;
	}

	public void setUserLabel(String userLabel) {
		this.userLabel = userLabel;
	}
}
