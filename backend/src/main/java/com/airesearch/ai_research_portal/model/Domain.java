package com.airesearch.ai_research_portal.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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
    @ManyToMany(mappedBy = "domains")
    @JsonBackReference
    private List<Publication> publications;

}
