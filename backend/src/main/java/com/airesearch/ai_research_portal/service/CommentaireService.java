package com.airesearch.ai_research_portal.service;

import com.airesearch.ai_research_portal.model.Commentaire;

import com.airesearch.ai_research_portal.repository.CommentaireRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentaireService implements com.airesearch.ai_research_portal.service.Interface.CommentaireService {

    @Autowired
    private CommentaireRepositry CommentaireRepository;
    @Override
    public void addCommentaire(Commentaire c) {
        CommentaireRepository.save(c);

    }

    @Override
    public List<Commentaire> getCommentaires() {
        return CommentaireRepository.findAll();

    }
    @Override
    public Commentaire getCommentaireById(int id) {
        Optional<Commentaire> commentaire = CommentaireRepository.findById((long) id);
        return commentaire.orElse(null);
    }

    @Override
    public Commentaire deleteCommentaire(int id) {
        Optional<Commentaire> commentaire = CommentaireRepository.findById((long) id);
        if (commentaire.isPresent()) {
            CommentaireRepository.delete(commentaire.get());
            return commentaire.get(); // Retourner le commentaire supprimé
        }
        return null;
    }

    @Override
    public Commentaire updateCommentaire(Commentaire c) {
        if (CommentaireRepository.existsById(c.getId())) {
            return CommentaireRepository.save(c); // Si le commentaire existe, on le met à jour
        }
        return null;
    }
}
