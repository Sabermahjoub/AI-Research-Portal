package com.airesearch.ai_research_portal.model;
import jakarta.persistence.*;

@Entity
@Table(name="Publication")
//@SequenceGenerator(name = "publication_seq", sequenceName = "publication_seq",allocationSize = 1)
public class Publication2 {

    @Id
    //@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "publication_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idPublication", nullable=false, unique=true)
    private long idPublication;

    @Column(name="titre", nullable=false)
    private String titre;

    @Column(name="resume", nullable=true)
    private String resume;

    @Column(name="datePublication")
    private String datePublication;

    @Lob
    @Column(name="contenu", nullable=false)
    private byte[] contenu;

    @ManyToMany
    @JoinTable(
            name="Contribution",
            joinColumns = @JoinColumn(name="publication_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> chercheurs;

    public Publication2() {
    }

    public Publication2(long idPublication, String titre, String resume, byte[] contenu) {
        this.idPublication = idPublication;
        this.titre = titre;
        this.resume = resume;
        this.contenu = contenu;
    }

    public long getIdPublication() {
        return idPublication;
    }

    public void setIdPublication(long idPublication) {
        this.idPublication = idPublication;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

    public byte[] getContenu() {
        return contenu;
    }

    public void setContenu(byte[] contenu) {
        this.contenu = contenu;
    }

    public List<User> getChercheurs() {
        return chercheurs;
    }

    public void setChercheurs(List<User> chercheurs) {
        this.chercheurs = chercheurs;
    }

    public String getDatePublication() {
        return datePublication;
    }

    public void setDatePublication(String datePublication) {
        this.datePublication = datePublication;
    }
}
