package com.airesearch.ai_research_portal.service;

import com.airesearch.ai_research_portal.model.Commentaire;
import com.airesearch.ai_research_portal.model.Publication;
import com.airesearch.ai_research_portal.repository.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PublicationService {

    @Autowired
    private PublicationRepository pubRepo;

    public Publication getPublicationById(long idPublication) throws Exception {
        Optional<Publication> optionalPublication = this.pubRepo.findById(idPublication);
        if (optionalPublication.isEmpty()) {
            throw new RuntimeException("Publication avec id : "+idPublication+" est introuvable!");
        }
        return optionalPublication.get();
    }

    public List<Publication> getPublicationByTitre(String titre) throws Exception {
        List<Publication> listPublication = this.pubRepo.findByTitle(titre);
        if (listPublication.isEmpty()) {
            throw new RuntimeException("Publication avec titre : "+titre+" est introuvable!");
        }
        return listPublication;
    }

    public List<Publication> getPublicationByDate(String datePublication) throws Exception {
        List<Publication> listPublication = this.pubRepo.findByPublicationDate(datePublication);
        if (listPublication.isEmpty()) {
            throw new RuntimeException("Publication avec titre : "+datePublication+" est introuvable!");
        }
        return listPublication;
    }

    public List<Publication> getPublicationByKeyWord(String keyWord) throws Exception {
        List<Publication> listPublication = this.pubRepo.findByKeyWord("%"+keyWord+"%");
        if (listPublication.isEmpty()) {
            throw new RuntimeException("No matching Publication with key-word : "+keyWord);
        }
        return listPublication;
    }

    public Publication updatePublication(Publication publication) throws Exception {
        if (!this.pubRepo.existsById(publication.getId())){
            throw new RuntimeException("Publication with id : "+publication.getId()+" doesn't exist.");
        }
        return this.pubRepo.save(publication);
    }

//    public void acceptPublication (long idPublication) {
//        Optional<Publication> optPublication = this.pubRepo.findById(idPublication);
//        if (optPublication.isEmpty()){
//            throw new RuntimeException("Publication does not exist");
//        }
//        Publication publication = optPublication.get();
//        publication.setAccepted(true);
//        this.pubRepo.save(publication);
//    }

    public void deletePublication (long idPublication){
        if (this.pubRepo.existsById(idPublication)) {
            this.pubRepo.deleteById(idPublication);
        }
        else {
            throw new RuntimeException("Publication not found with ID: " + idPublication);
        }
    }

    public List<Publication> getAllPublications() {
        return this.pubRepo.findAll();
    }

    public List<Publication> getPublicationsByAcceptance(boolean isAccepted) {
        return this.pubRepo.findByAccepted(isAccepted);
    }

    public Publication createPublication(Publication publication) throws Exception {
        if (this.pubRepo.findById(publication.getId()).isPresent()){
            throw new RuntimeException("Publication already exists ");
        }
        return this.pubRepo.save(publication);
    }

}