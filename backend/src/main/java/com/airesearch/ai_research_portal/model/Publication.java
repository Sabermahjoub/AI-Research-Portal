
package com.airesearch.ai_research_portal.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Publication")
public class Publication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", nullable=false, unique=true)
    private long id;

    @Column(name="title", nullable=false)
    private String title;

    @Column(name="description", nullable=true)
    private String description;

    @Column(name="publicationDate")
    private String publicationDate;

    @Lob
    @Column(name="content", nullable=false)
    private byte[] content;

    // True, if the admin accepts the article to be published in the website
    // false, otherwise.
    @Column(name="accepted", nullable=true)
    private Boolean accepted;

    // References the admin who accepted the publication of the article.
    // Could be null, if not yet accepted.
    @OneToOne
    @JoinColumn(name="admin_id", nullable=true)
    private Admin admin;

    // List (1,*) of the team (chercheurs) who worked on this publication/article
    @ManyToMany
    @JoinTable(
            name="Contribution",
            joinColumns = @JoinColumn(name="publication_id"),
            inverseJoinColumns = @JoinColumn(name = "chercheur_id")
    )
    private List<Chercheur> team;

    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Commentaire> commentaires;

    @ManyToMany( cascade = CascadeType.ALL)
    //@JsonManagedReference
    //@JsonIgnore
    @JoinTable(
            name = "publication_domains",
            joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "domainId")
    )
    private List<Domain> domains;

}
