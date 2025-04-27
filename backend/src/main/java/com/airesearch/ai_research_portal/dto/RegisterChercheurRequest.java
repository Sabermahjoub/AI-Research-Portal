package com.airesearch.ai_research_portal.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterChercheurRequest {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String workAddress;
    private String jobTitle;
}
