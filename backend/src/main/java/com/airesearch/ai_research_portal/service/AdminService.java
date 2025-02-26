package com.airesearch.ai_research_portal.service;

import com.airesearch.ai_research_portal.model.Chercheur;
import com.airesearch.ai_research_portal.repository.ChercheurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private ChercheurRepository chercheurRepository;

    public List<Chercheur> getChercheurs() {
        return chercheurRepository.findAll();
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
}
