package com.airesearch.ai_research_portal.service.Interface;

import com.airesearch.ai_research_portal.model.Commentaire;

import java.util.List;

public interface CommentaireService {
    public void addCommentaire(Commentaire c);
    public List<Commentaire> getCommentaires();
    public Commentaire getCommentaireById(int id);
    public Commentaire deleteCommentaire(int id);
    public Commentaire updateCommentaire(Commentaire c);
}
