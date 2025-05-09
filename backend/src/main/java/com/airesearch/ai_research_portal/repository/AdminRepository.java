package com.airesearch.ai_research_portal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.airesearch.ai_research_portal.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    
    Admin findByUsername(String username);
}
