package com.airesearch.ai_research_portal.model;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Domain {
    @Id
    @GeneratedValue
    private Long domainId;
    private String domainName;
    private String domainDesc;


}
