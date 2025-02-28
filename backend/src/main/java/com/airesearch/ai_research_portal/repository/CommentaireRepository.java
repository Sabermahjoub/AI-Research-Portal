package com.airesearch.ai_research_portal.repository;

import com.airesearch.ai_research_portal.model.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentaireRepository extends JpaRepository<Commentaire,Long> {

    Optional<Commentaire> findById(long idCommentaire);
    @Query(value = "SELECT * FROM Commentaire WHERE id_publication = :id", nativeQuery = true)
    List<Commentaire> findByIdPublication(@Param("id") Long id);


}
