package com.airesearch.ai_research_portal.service;

import com.airesearch.ai_research_portal.dto.ChercheurDTO;
import com.airesearch.ai_research_portal.model.Chercheur;
import com.airesearch.ai_research_portal.repository.ChercheurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChercheurService {

    @Autowired
    private ChercheurRepository chercheurRepository;

    public Chercheur addChercheur(Chercheur chercheur) {
        return chercheurRepository.save(chercheur);
    }

    public Optional<Chercheur> updateChercheur(Long id, Chercheur updatedChercheur) {
        return chercheurRepository.findById(id).map(existingChercheur -> {
            existingChercheur.setFirstName(updatedChercheur.getFirstName());
            existingChercheur.setLastName(updatedChercheur.getLastName());
            existingChercheur.setEmail(updatedChercheur.getEmail());
            existingChercheur.setAddress(updatedChercheur.getAddress());
            existingChercheur.setWorkAddress(updatedChercheur.getWorkAddress());
            existingChercheur.setJobTitle(updatedChercheur.getJobTitle());
            return chercheurRepository.save(existingChercheur);
        });
    }

    public List<ChercheurDTO> getAllChercheurs() {
        return chercheurRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public Optional<Chercheur> getChercheurById(Long id) {
        return chercheurRepository.findById(id);
    }

    public void deleteChercheur(Long id) {
        chercheurRepository.deleteById(id);
    }

    public List<Chercheur> findByAddress(String address) {
        return chercheurRepository.findByAddress(address);
    }

    public List<Chercheur> findByWorkAddress(String workAddress) {
        return chercheurRepository.findByWorkAddress(workAddress);
    }

    public List<Chercheur> findByJobTitle(String jobTitle) {
        return chercheurRepository.findByJobTitle(jobTitle);
    }

    public List<Chercheur> getByData(String address, String workAddress, String jobTitle) {
        return chercheurRepository.findByAddressAndWorkAddressAndJobTitle(address, workAddress, jobTitle);
    }
    private ChercheurDTO toDTO(Chercheur chercheur) {
        ChercheurDTO dto = new ChercheurDTO();
        dto.setFirstName(chercheur.getFirstName());
        dto.setLastName(chercheur.getLastName());
        dto.setAddress(chercheur.getAddress());
        dto.setWorkAddress(chercheur.getWorkAddress());
        dto.setJobTitle(chercheur.getJobTitle());
        return dto;
    }
}
