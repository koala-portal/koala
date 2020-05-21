
package com.koala.portal.services.impl;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.koala.portal.domain.PortalRoles;
import com.koala.portal.domain.form.FormAction;
import com.koala.portal.domain.form.FormStatus;
import com.koala.portal.domain.history.EntityType;
import com.koala.portal.domain.notes.NoteCategory;
import com.koala.portal.exceptions.EntityNotFoundException;
import com.koala.portal.exceptions.InvalidFormException;
import com.koala.portal.models.HistoryEntry;
import com.koala.portal.models.Note;
import com.koala.portal.models.UamForm;
import com.koala.portal.models.UserDetails;
import com.koala.portal.repos.HistoryEntryRepo;
import com.koala.portal.repos.UamFormRepo;
import com.koala.portal.services.NameResolutionService;
import com.koala.portal.services.NotesServices;
import com.koala.portal.services.UamFormServices;

@Service
public class UamFormServicesImpl implements UamFormServices {

	@Autowired
	private UamFormRepo uamFormRepo;
	
	@Autowired
	private NotesServices notesServices;
	
	@Autowired
	private HistoryEntryRepo historyRepo;
	
	@Autowired
	private NameResolutionService nameResolutionService;

	@Value("${uam.form.send.assignee.email:false}") // value after ':' is the default
	private boolean sendNotificationEmail;
	
	@Override
	public UamForm create(String assigneeId, UserDetails user) {
		if (user.getRole() != PortalRoles.ADMIN)
			throw new AccessDeniedException("Only Admins have permission to create a new UAM Form.");

		UamForm newForm = new UamForm();
		newForm.setCreatedBy(user.getUserCreds());
		newForm.setCreated(new Date());
		newForm.setOwnerId(assigneeId);
		newForm.setStatus(FormStatus.DRAFT);
		
		UamForm savedForm = uamFormRepo.save(newForm);
		
		if (sendNotificationEmail) {
			//@TODO - Wire up a mail client and start firing off emails
		}
		
		return savedForm;
	}


	@Override
	public void update(UamForm uamForm, UserDetails user) throws EntityNotFoundException, InvalidFormException {
		uamForm.setUpdated(new Date());
		uamForm.setUpdatedBy(user.getUserCreds());
		uamFormRepo.save(uamForm);
	}
	
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
	public UamForm get(long id, UserDetails user) throws InvalidFormException, EntityNotFoundException {
		Optional<UamForm> uamFormOpt = uamFormRepo.findById(id);
		if (!uamFormOpt.isPresent())
			throw new EntityNotFoundException("UAM Form", Long.toString(id));
		
		//@TODO - Do they have access to see this form???
		
		UamForm uamForm = uamFormOpt.get();
		addNotesAndHistory(uamForm, user);
		fullyPopulateTicket(uamForm, user);
		
		return uamForm;
	}
	

	private void addNotesAndHistory(UamForm uamForm, UserDetails user) {
		//Pull back any and all notes on this UAM form that the user can see
		uamForm.getNotes().addAll(notesServices.getAll(NoteCategory.UAMFORM, uamForm.getId(), user));
		
		//Now pull back any and all history on this UAM form that the user can see
		if (user.getRole().isInternalKoalaRole())
			uamForm.getHistory().addAll(historyRepo.findByEntityIdAndEntityTypeOrderByDoneOn(uamForm.getId(), EntityType.UAM_FORM));			
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
		
		//Is the person requesting this form the person it was assigned to????
		form.setOwnerOfForm(user.getUserCreds().equals(form.getOwnerId()));
		
		form.setOwnerLabel(nameResolutionService.resolveToLabel(form.getOwnerId()));
		form.setCreatedByLabel(nameResolutionService.resolveToLabel(form.getCreatedBy()));
		form.setUpdatedByLabel(nameResolutionService.resolveToLabel(form.getUpdatedBy()));
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

	@Override
	public void addNote(UserDetails user, Note note) throws InvalidFormException {
		note.setCategory(NoteCategory.UAMFORM);
		
		notesServices.save(note, user);
	}

	@Override
	public void performAction(long id, FormAction action, UserDetails user) throws EntityNotFoundException, InvalidFormException {
		Optional<UamForm> formOpt = uamFormRepo.findById(id);
		
		if (!formOpt.isPresent())
			throw new EntityNotFoundException("UAM Form", Long.toString(id));
		
		//@TODO - Check to make sure the logged in person has the proper role to perform this action.
		
		UamForm form = formOpt.get();
		FormStatus orgStatus = form.getStatus();	//Save this for later
		FormStatus newStatus = null;
		if (action == FormAction.SUBMIT) {
			newStatus = FormStatus.SUBMITTED;
			
		} else if (action == FormAction.REJECT) {
			newStatus = FormStatus.REJECTED;
			
		} else if (action == FormAction.DELETE) {
			newStatus = FormStatus.DELETED;
			
		} else if (action == FormAction.APPROVE) {
			newStatus = FormStatus.APPROVED;
			
		} else if (action == FormAction.RETURN) {
			newStatus = FormStatus.DRAFT;
			
		} else if (action == FormAction.CLOSE) {
			newStatus = FormStatus.COMPLETED;
			
		} else {
			throw new InvalidFormException(action.name() + " does not map to a know action/status pattern.", "Talk to the developer about what you're trying to do and try again.");
		}
		
		form.setStatus(newStatus);
		form.setUpdated(new Date());
		form.setUpdatedBy(user.getUserCreds());
		uamFormRepo.save(form);
		
		HistoryEntry he = new HistoryEntry(	form.getId(), 
											EntityType.UAM_FORM, 
											orgStatus, 
											action, 
											newStatus,
											user.getUserCreds(),
											new Date());
		historyRepo.save(he);
	}
}
