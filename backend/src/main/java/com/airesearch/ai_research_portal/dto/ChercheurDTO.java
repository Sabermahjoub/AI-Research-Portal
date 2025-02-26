package com.airesearch.ai_research_portal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChercheurDTO {
    private String firstName;
    private String lastName;
    private String address;
    private String workAddress;
    private String jobTitle;
}
