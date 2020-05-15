
package com.koala.portal.services.impl;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.koala.portal.domain.PortalRoles;
import com.koala.portal.domain.form.FormAction;
import com.koala.portal.domain.form.FormStatus;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.UamForm;
import com.koala.portal.models.UserDetails;
import com.koala.portal.repos.UamFormRepo;
import com.koala.portal.services.UamFormServices;

@Service
public class UamFormServicesImpl implements UamFormServices {

	@Autowired
	private UamFormRepo uamFormRepo;

	@Override
	public List<UamForm> getAll(UserDetails user) throws InvalidFormException {
		return getAll(user, null);
	}

	@Override
	public List<UamForm> getAll(UserDetails user, FormStatus status) throws InvalidFormException {
		if (user.getRole().isInternalKoalaRole()) {
			//Looks like this person exists within KMD.  They can see everything.
			List<UamForm> forms = Lists.newArrayList(uamFormRepo.findAll());
			fullyPopulateTickets(forms, user);
			
			return forms;
		} else {
			
		}
		return null;
	}
	

	@Override
	public UamForm save(UserDetails user, UamForm form) throws InvalidFormException {
		form.setCreated(new Date());
		form.setOwnerId(user.getUserCreds());
		form.setCreatedBy(user.getUserCreds());
		form.setStatus(FormStatus.DRAFT);
		UamForm newForm = uamFormRepo.save(form);
		
		return newForm;
	}
	
	private void fullyPopulateTickets(List<UamForm> forms, UserDetails user) throws InvalidFormException {
		for (UamForm f : forms)
			fullyPopulateTicket(f, user);
	}
	
	private void fullyPopulateTicket(UamForm form, UserDetails user) throws InvalidFormException {
		//Determine if the user has permission to edit the form.  Right now the business rules are they can edit the form if one of the following is true:
		// - They hold the ADMIN role.
		// = They are the submitter of the form AND the status is set to DRAFT or REJECTED.
		form.setEditable(	user.getRole() == PortalRoles.ADMIN || 
							(	form.getOwnerId().equalsIgnoreCase(user.getUserCreds()) && 
								(form.getStatus() == FormStatus.DRAFT || form.getStatus() == FormStatus.REJECTED)
							));
		
		//Now figure out what actions the logged in person can do depending on their role and the status of the form.
		form.setPermittedActions(getPermittedActions(user.getRole(), form.getStatus()));
	}
	
	private Set<FormAction> getPermittedActions(PortalRoles role, FormStatus status) throws InvalidFormException {
		//Koala Employees (not Koala Admins) can only view all the data, they can't modify it.
		if (role == PortalRoles.EMPLOYEE)
			return new HashSet<>();
		
		//If they get this far they are either a partner or admin.  If a form is in DRAFT status status the user can submit it or cancel it.
		if (status == FormStatus.DRAFT)
			return createActionsSet(FormAction.SUBMIT, FormAction.DELETE);
		
		//At this point in the logic they must be an admin.  If a form is in SUBMITTED status the user can approve the form, return 
		//the form to the submitter for more work, reject the form, or remove (delete) it from the system.
		if (status == FormStatus.SUBMITTED && role == PortalRoles.ADMIN)
			return createActionsSet(FormAction.APPROVE, FormAction.RETURN, FormAction.REJECT, FormAction.DELETE);
		
		//If a form is in RETURNED status the user can submit it or delete it.
		if (status == FormStatus.RETURNED)
			return createActionsSet(FormAction.SUBMIT, FormAction.DELETE);

		//At this point in the logic they must be an admin.  If a form is in REJECTED status an admin can choose to put it back into work.
		if (status == FormStatus.REJECTED && role == PortalRoles.ADMIN)
			return createActionsSet(FormAction.RETURN);
		
		//At this point in the logic they must be an admin.  If a form is in APPROVED status an admin can close it once the work is done.
		if (status == FormStatus.APPROVED && role == PortalRoles.ADMIN)
			return createActionsSet(FormAction.CLOSE);
		
		if (status == FormStatus.COMPLETED)
			return new HashSet<>();
		
		throw new InvalidFormException("No Status-Action mapping for " + role.name() + " AND " + status.name(), "Notify the system admins of this issue.");
	}
	
	private Set<FormAction> createActionsSet(FormAction... actions) {
		Set<FormAction> actionsSet = new HashSet<>();
		for (FormAction fa : actions)
			actionsSet.add(fa);
		
		return actionsSet;
	}

	
}
