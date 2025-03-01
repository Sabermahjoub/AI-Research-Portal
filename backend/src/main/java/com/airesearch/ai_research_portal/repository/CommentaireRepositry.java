package com.airesearch.ai_research_portal.repository;

import com.airesearch.ai_research_portal.model.Chercheur;
import com.airesearch.ai_research_portal.model.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentaireRepositry extends JpaRepository<Commentaire, Long> {

}
