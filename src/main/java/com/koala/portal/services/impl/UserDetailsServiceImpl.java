package com.koala.portal.services.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.koala.portal.domain.PortalRoles;
import com.koala.portal.models.User;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		//This should be the DN of the person logging in.
		
		for (PortalRoles r : PortalRoles.values())
			if (username.toUpperCase().contains(r.name().toUpperCase())) {
				User u = createDummyUser(r, username);
				System.out.println(u.getUsername() + " granted the role of + " + r.name());
				return u;
			}
		
		throw new UsernameNotFoundException("No user with the name " + username + " could be found.");
	}
	
	private User createDummyUser(PortalRoles role, String userName) {
		User u = new User();
		u.setUsername(userName);
		u.setUserLabel("John Doe");
		u.setEnabled(true);
		u.setAccountNonLocked(true);
		u.addRole(role);
		
		return u;
	}
}
