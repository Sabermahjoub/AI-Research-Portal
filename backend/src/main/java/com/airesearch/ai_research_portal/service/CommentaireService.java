package com.airesearch.ai_research_portal.service;

import com.airesearch.ai_research_portal.model.Commentaire;

import com.airesearch.ai_research_portal.repository.CommentaireRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CommentaireService{

    @Autowired
    private CommentaireRepositry CommentaireRepository;

    public Commentaire addCommentaire(Commentaire c) throws Exception {
        return this.CommentaireRepository.save(c);

    }

    public List<Commentaire> getCommentaires() throws Exception {
        return CommentaireRepository.findAll();

    }

    public Commentaire getCommentaireById(long idCommentaire) throws Exception{
        Optional<Commentaire> optionalCommentaire = this.CommentaireRepository.findById(idCommentaire);
        if (optionalCommentaire.isEmpty()) {
            throw new RuntimeException("Commentaire avec id : "+idCommentaire+" est introuvable!");
        }
        return optionalCommentaire.get();
    }

    public void deleteCommentaire (long idCommentaire) throws Exception {
        if (!this.CommentaireRepository.existsById(idCommentaire)){
            throw new RuntimeException("Commentaire with id : "+idCommentaire+" doesn't exist.");
        }
        this.CommentaireRepository.deleteById(idCommentaire);
    }

    public Commentaire updateCommentaire(Commentaire comm) throws Exception {
        if (!this.CommentaireRepository.existsById(comm.getId())){
            throw new RuntimeException("Commentaire with id : "+comm.getId()+" doesn't exist.");
        }
        return this.CommentaireRepository.save(comm);
    }

    public List<Commentaire> getAllCommentsByPublication(long idPublication) throws Exception {
        return this.CommentaireRepository.findByIdPublication(idPublication);
    }
}
