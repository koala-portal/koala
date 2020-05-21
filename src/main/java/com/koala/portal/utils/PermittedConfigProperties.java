package com.koala.portal.utils;

import java.util.HashSet;
import java.util.Set;

public class PermittedConfigProperties {
	
	private static final Set<String> publicProperties = new HashSet<>();
	
	private static void loadSet() {
		publicProperties.add("max.num.top.questions");
		publicProperties.add("days.back.top.faqs");
		publicProperties.add("uam.form.send.assignee.email");
	}
	
	public static boolean isPublicProperty(String val) {
		if (publicProperties.isEmpty())
			loadSet();
		
		return publicProperties.contains(val);
	}
}
