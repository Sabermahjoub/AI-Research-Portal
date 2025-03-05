package com.airesearch.ai_research_portal.service;

import com.airesearch.ai_research_portal.model.Domain;
import com.airesearch.ai_research_portal.model.Publication;
import com.airesearch.ai_research_portal.repository.DomainRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DomainService {

    private DomainRepository domainRepository;

    public DomainService(DomainRepository domainRepository) {
        this.domainRepository = domainRepository;
    }

    public List<Domain> getAllDomains(){
        return domainRepository.findAll();
    }

    public Domain getDomainById(Long domainId) {
        Domain domain = domainRepository.findById(domainId).orElseThrow(
                () -> new IllegalStateException("No such domain")
        );
        return domain;
    }

    public void registerDomain(Domain domain) {
        domainRepository.save(domain);
    }

    public void deleteDomain(Long domainId) {
        boolean domainExists = domainRepository.existsById(domainId);
        if(!domainExists){
            throw new IllegalStateException("No such domain with id " + domainId);
        }
        domainRepository.deleteById(domainId);
    }

    @Transactional
    public void updateDomain(Long domainId, String domainName, String domainDesc) {

        Domain domain = domainRepository.findById(domainId).orElseThrow(
                () -> new IllegalStateException("No such domain with id" + domainId)
        );
        System.out.println(domainName);
        if(!domainName.isEmpty()){
            domain.setDomainName(domainName);
        }
        if(!domainDesc.isEmpty()){
            domain.setDomainDesc(domainDesc);
        }
    }

     //TODO publication manipulation.
     public List<Publication> getDomainePublications(Long domaineId) {
         Domain domaine = domainRepository.findById(domaineId).orElseThrow(
                 () -> new IllegalStateException("No domaine found with this id")
         );
         return domaine.getPublications();
     }
}
