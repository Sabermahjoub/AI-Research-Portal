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

    public ChercheurDTO addChercheur(Chercheur chercheur) {
        Chercheur savedChercheur = chercheurRepository.save(chercheur);
        return toDTO(savedChercheur);
    }

    public Optional<ChercheurDTO> updateChercheur(Long id, ChercheurDTO updatedChercheur) {
        return chercheurRepository.findById(id).map(existingChercheur -> {
            existingChercheur.setFirstName(updatedChercheur.getFirstName());
            existingChercheur.setLastName(updatedChercheur.getLastName());
            existingChercheur.setEmail(updatedChercheur.getEmail());
            existingChercheur.setAddress(updatedChercheur.getAddress());
            existingChercheur.setWorkAddress(updatedChercheur.getWorkAddress());
            existingChercheur.setJobTitle(updatedChercheur.getJobTitle());

            Chercheur savedChercheur = chercheurRepository.save(existingChercheur);
            return toDTO(savedChercheur);
        });
    }


    public List<ChercheurDTO> getAllChercheurs() {
        return chercheurRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public Optional<ChercheurDTO> getChercheurById(Long id) {
        return chercheurRepository.findById(id)
                .map(this::toDTO);
    }

    public void deleteChercheur(Long id) {
        chercheurRepository.deleteById(id);
    }


    public List<ChercheurDTO> getByData(String address, String workAddress, String jobTitle) {
        return chercheurRepository.findByAddressContainingIgnoreCaseOrWorkAddressContainingIgnoreCaseOrJobTitleContainingIgnoreCase(address, workAddress, jobTitle)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    private ChercheurDTO toDTO(Chercheur chercheur) {
        ChercheurDTO dto = new ChercheurDTO();
        dto.setId(chercheur.getId());
        dto.setUsername(chercheur.getUsername());
        dto.setFirstName(chercheur.getFirstName());
        dto.setLastName(chercheur.getLastName());
        dto.setAddress(chercheur.getAddress());
        dto.setWorkAddress(chercheur.getWorkAddress());
        dto.setJobTitle(chercheur.getJobTitle());
        return dto;
    }


}
