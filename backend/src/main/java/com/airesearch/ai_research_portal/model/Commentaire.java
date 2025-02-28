package com.airesearch.ai_research_portal.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="Commentaire")
public class Commentaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idCommentaire", nullable=false, unique=true)
    private long idCommentaire;

    @Column(name="content", nullable=false)
    private String content;

    @Column(name="datePublication", nullable=false)
    private String datePublication;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="idPublication", nullable=false)
    private Publication idPublication;

    @ManyToOne
    @JoinColumn(name="idUser", nullable=false)
    private User idUser;

}
