package com.koala.portal.exceptions;

public class InvalidConfigException extends Exception {
	private String solution;
	
	public InvalidConfigException(String msg, String solution) {
		super(msg);
		setSolution(solution);
	}

	public String getSolution() {
		return solution;
	}

	public void setSolution(String solution) {
		this.solution = solution;
	}
	
}
