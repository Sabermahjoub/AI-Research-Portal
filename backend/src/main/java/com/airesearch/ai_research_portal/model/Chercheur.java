package com.airesearch.ai_research_portal.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
public class Chercheur extends User {

    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String workAddress;
    private String jobTitle;

    public Chercheur() {
        this.role = Role.CHERCHEUR;
    }
}
