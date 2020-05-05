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

		for (PortalRoles r : PortalRoles.values())
			if (username.toUpperCase().contains(r.name().toUpperCase()))
				return createDummyUser(r);
		
		throw new UsernameNotFoundException("No user with the name " + username + " could be found.");
	}
	
	private User createDummyUser(PortalRoles role) {
		User u = new User();
		u.setUsername("John Doe");
		u.setEnabled(true);
		u.setAccountNonLocked(true);
		u.addRole(role);
		
		System.out.println("Creating User with ROLE=" + role);
		
		return u;
	}
}
