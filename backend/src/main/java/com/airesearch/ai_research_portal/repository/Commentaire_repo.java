package com.airesearch.ai_research_portal.repository;

import com.airesearch.ai_research_portal.model.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface Commentaire_repo extends JpaRepository<Commentaire, Long> {

    Optional<Commentaire> findById(long idCommentaire);
    List<Commentaire> findByIdPublication(long idPublication);

}
