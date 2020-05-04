package com.koala.portal.exceptions;

public class EntityNotFoundException extends Exception {
	
	private String entityName;
	private String id;
	
	public EntityNotFoundException(String entityName, String id) {
		this.id = id;
		this.entityName = entityName;
	}
	
	@Override
    public String getMessage() {
        return String.format(	"%s with ID=%s was not found in the system", 
        							entityName,
        							id);
    }

}
