package com.koala.portal.domain;

import java.io.Serializable;

@SuppressWarnings("serial")
public class ErrorInfo implements Serializable {

	private int code;			// The HTTP status code (400, 404, 403, 500, etc)

	private String error;		// What went wrong in plain English (Entity not found, field XXXX not provided,
								// email field not properly formatted, not authorized to access this feature,
								// etc)

	private String resolution;	// How they can resolve the issue on their end (4XX errors only) - Request this
								// role if getting a 403, fix this field if getting a 400, etc and so on

	public ErrorInfo(int code, String error, String resolution) {
		this.code = code;
		this.error = error;
		this.resolution = resolution;
	}
	
	public int getCode() {

		return code;

	}

	public void setCode(int code) {

		this.code = code;

	}

	public String getError() {

		return error;

	}

	public void setError(String error) {

		this.error = error;

	}

	public String getResolution() {

		return resolution;

	}

	public void setResolution(String resolution) {

		this.resolution = resolution;

	}

}