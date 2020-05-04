package com.koala.portal.exceptions;

public class InvalidFormException extends Exception {
	private String solution;
	
	public InvalidFormException(String msg, String solution) {
		super(msg);
		setSolution(solution);
	}
	
	public InvalidFormException(String msg, String solution, Exception ex) {
		super(msg, ex);
		setSolution(solution);
	}

	public String getSolution() {
		return solution;
	}

	public void setSolution(String solution) {
		this.solution = solution;
	}
	
}
