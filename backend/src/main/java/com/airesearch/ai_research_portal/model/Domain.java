package com.airesearch.ai_research_portal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Domain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long domainId;
    @Column(nullable=false, unique=true)
    private String domainName;
    private String domainDesc;
    @ManyToMany(mappedBy = "domains")
    @JsonIgnore
    //@JsonBackReference
    private List<Publication> publications;

}
