package com.airesearch.ai_research_portal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Commentaire {
    @Id
    private long id;
    private String content;
    private String date;
    @ManyToOne
    @JoinColumn(name="chercheur_id")  // clé étrangère vers Chercheur
    private Chercheur chercheur;
}
