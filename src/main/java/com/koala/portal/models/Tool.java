package com.koala.portal.models;

import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

public class Tool {

    @ApiModelProperty(notes = "The auto-generated ID of the Tool.  This will be set by the system and not the client.", allowEmptyValue = true, dataType = "Long")
    private Long id;

    @ApiModelProperty(notes = "The name given to the Tool", allowEmptyValue = false, dataType = "String")
    private String name;

    @ApiModelProperty(notes = "A brief description of what the Tool does", allowEmptyValue = false, dataType = "String")
    private String description;

    @ApiModelProperty(notes = "The URL location of the Tool", allowEmptyValue = false, dataType = "String")
    private String url;

    @ApiModelProperty(notes = "The approximate number of users using the Tool", allowEmptyValue = false, dataType = "Integer")
    private Integer numUsers;

    @ApiModelProperty(notes = "Whether or not the Tool is starred and marked as important", allowEmptyValue = false, dataType = "Boolean")
    private Boolean starred;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Column(nullable = false, length = 512)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Lob
    @Column(nullable = false, length = 4000)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(nullable = false)
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Column(nullable = false)
    public Integer getNumUsers() {
        return numUsers;
    }

    public void setNumUsers(Integer numUsers) {
        this.numUsers = numUsers;
    }

    @Column(nullable = false)
    public Boolean getStarred() {
        return starred;
    }

    public void setStarred(Boolean starred) {
        this.starred = starred;
    }
}
