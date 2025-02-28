package com.airesearch.ai_research_portal.service;


import com.airesearch.ai_research_portal.model.Commentaire;
import com.airesearch.ai_research_portal.model.Publication;
import com.airesearch.ai_research_portal.repository.CommentaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentaireService {

    @Autowired
    private CommentaireRepository commrepo;


    public Commentaire getCommentaireById(long idCommentaire){
        Optional<Commentaire> optionalCommentaire = this.commrepo.findById(idCommentaire);
        if (optionalCommentaire.isEmpty()) {
            throw new RuntimeException("Commentaire avec id : "+idCommentaire+" est introuvable!");
        }
        return optionalCommentaire.get();
    }

    public Commentaire createCommentaire(Commentaire comm) throws Exception{
        return this.commrepo.save(comm);
    }

    public Commentaire updateCommentaire(Commentaire comm) throws Exception {
        if (!this.commrepo.existsById(comm.getIdCommentaire())){
            throw new RuntimeException("Commentaire with id : "+comm.getIdCommentaire()+" doesn't exist.");
        }
        return this.commrepo.save(comm);
    }

    public void deleteCommentaire (long idCommentaire) throws Exception {
        if (!this.commrepo.existsById(idCommentaire)){
            throw new RuntimeException("Commentaire with id : "+idCommentaire+" doesn't exist.");
        }
        this.commrepo.deleteById(idCommentaire);
    }

    public List<Commentaire> getAllCommentsByPublication(long idPublication) {
        return this.commrepo.findByIdPublication(idPublication);
    }
}