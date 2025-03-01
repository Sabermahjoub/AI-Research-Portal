package com.airesearch.ai_research_portal.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Commentaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", nullable=false, unique=true)
    private long id;

    @Column(name="content", nullable=false)
    private String content;

    @Column(name="datePublication", nullable=false)
    private String datePublication;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="publication_id", nullable=false)
    private Publication publication;

    @ManyToOne
    @JoinColumn(name="chercheur_id", nullable=false)  // clé étrangère vers Chercheur
    private Chercheur chercheur;
}
