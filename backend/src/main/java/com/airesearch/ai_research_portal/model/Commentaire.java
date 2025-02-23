package com.airesearch.ai_research_portal.model;
import jakarta.persistence.*;

@Entity
@Table(name="Commentaire")
public class Commentaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idCommentaire", nullable=false, unique=true)
    private long idCommentaire;

    @Column(name="contenu", nullable=false)
    private String contenu;

    @Column(name="datePublication", nullable=false)
    private String datePublication;

    @OneToOne
    @JoinColumn(name="idPublication", nullable=false)
    private Publication idPublication;

    @OneToOne
    @JoinColumn(name="idUser", nullable=false)
    private User idUser;


    public Commentaire() {
    }

    public Commentaire(String contenu, long idCommentaire, String datePublication, Publication idPublication, User idUser) {
        this.contenu = contenu;
        this.idCommentaire = idCommentaire;
        this.datePublication = datePublication;
        this.idPublication = idPublication;
        this.idUser = idUser;
    }

    public long getIdCommentaire() {
        return idCommentaire;
    }

    public void setIdCommentaire(long idCommentaire) {
        this.idCommentaire = idCommentaire;
    }

    public String getContenu() {
        return contenu;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public String getDatePublication() {
        return datePublication;
    }

    public void setDatePublication(String datePublication) {
        this.datePublication = datePublication;
    }

    public Publication getIdPublication() {
        return idPublication;
    }

    public void setIdPublication(Publication idPublication) {
        this.idPublication = idPublication;
    }

    public User getIdUser() {
        return idUser;
    }

    public void setIdUser(User idUser) {
        this.idUser = idUser;
    }
}
