package com.airesearch.ai_research_portal.repository;

import com.airesearch.ai_research_portal.model.Chercheur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChercheurRepository extends JpaRepository<Chercheur, Long> {
    List<Chercheur> findByAddress(String address);

    List<Chercheur> findByWorkAddress(String workAddress);

    List<Chercheur> findByJobTitle(String jobTitle);

    List<Chercheur> findByFirstNameAndLastNameAndEmail(String firstName, String lastName, String email);

    List<Chercheur> findByAddressAndWorkAddressAndJobTitle(String address, String workAddress, String jobTitle);
}
