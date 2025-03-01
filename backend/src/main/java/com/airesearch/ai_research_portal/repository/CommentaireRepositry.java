package com.airesearch.ai_research_portal.repository;

import com.airesearch.ai_research_portal.model.Chercheur;
import com.airesearch.ai_research_portal.model.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentaireRepositry extends JpaRepository<Commentaire, Long> {

    @Query(value = "SELECT * FROM Commentaire WHERE publication_id = :id", nativeQuery = true)
    List<Commentaire> findByIdPublication(@Param("id") Long id);

}
