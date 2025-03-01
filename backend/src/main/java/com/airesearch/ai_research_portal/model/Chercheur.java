package com.airesearch.ai_research_portal.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
//    @OneToMany(mappedBy = "chercheur", cascade = CascadeType.ALL)
//    private List<Commentaire> commentaires;
    public Chercheur() {
        this.role = Role.CHERCHEUR;
    }
}
