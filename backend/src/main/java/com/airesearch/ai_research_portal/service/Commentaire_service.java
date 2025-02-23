package com.airesearch.ai_research_portal.service;


import com.airesearch.ai_research_portal.model.Commentaire;
import com.airesearch.ai_research_portal.repository.Commentaire_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Commentaire_service {

    @Autowired
    private Commentaire_repo commrepo;

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
            throw new RuntimeException("Commentaire with id : "+comm.getIdCommentaire()+" doesn't exist.");
        }
        this.commrepo.deleteById(idCommentaire);
    }

    public List<Commentaire> getAllCommentsByPublication(long idPublication) {
        return this.commrepo.findByIdPublication(idPublication);
    }
}
