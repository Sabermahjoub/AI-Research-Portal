package com.airesearch.ai_research_portal.repository;

import com.airesearch.ai_research_portal.model.Domain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DomainRepository extends JpaRepository<Domain, Long> {
}
