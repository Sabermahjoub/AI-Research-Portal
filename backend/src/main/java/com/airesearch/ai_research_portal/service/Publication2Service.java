package com.airesearch.ai_research_portal.service;

import com.airesearch.ai_research_portal.model.Publication2;
import com.airesearch.ai_research_portal.repository.Publication2_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Publication2Service {

    @Autowired
    private Publication2_repo pubRepo;

    public Publication2 getPublicationById(long idPublication) throws Exception {
        Optional<Publication2> optionalPublication = this.pubRepo.findByIdPublication(idPublication);
        if (optionalPublication.isEmpty()) {
            throw new RuntimeException("Publication avec id : "+idPublication+" est introuvable!");
        }
        return optionalPublication.get();
    }

    public List<Publication2> getPublicationByTitre(String titre) throws Exception {
        List<Publication2> listPublication = this.pubRepo.findByTitre(titre);
        if (listPublication.isEmpty()) {
            throw new RuntimeException("Publication avec titre : "+titre+" est introuvable!");
        }
        return listPublication;
    }

    public List<Publication2> getPublicationByDate(String datePublication) throws Exception {
        List<Publication2> listPublication = this.pubRepo.findByDatePublication(datePublication);
        if (listPublication.isEmpty()) {
            throw new RuntimeException("Publication avec titre : "+datePublication+" est introuvable!");
        }
        return listPublication;
    }

    public List<Publication2> getPublicationByKeyWord(String keyWord) throws Exception {
        List<Publication2> listPublication = this.pubRepo.findByKeyWord(keyWord);
        if (listPublication.isEmpty()) {
            throw new RuntimeException("No matching Publication with key-word : "+keyWord);
        }
        return listPublication;
    }

    public void deletePublication (long idPublication){
        if (this.pubRepo.existsById(idPublication)) {
            this.pubRepo.deleteById(idPublication);
        }
        else {
            throw new RuntimeException("Publication not found with ID: " + idPublication);
        }
    }

    public List<Publication2> getAllPublications() {
        return this.pubRepo.findAll();
    }

    public Publication2 createPublication(Publication2 publication) throws Exception {
        if (this.pubRepo.findById(publication.getIdPublication()).isPresent()){
            throw new RuntimeException("Publication already exists ");
        }
        return this.pubRepo.save(publication);
    }

}
