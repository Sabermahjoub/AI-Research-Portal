package com.airesearch.ai_research_portal.repository;

import com.airesearch.ai_research_portal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Integer> {
    User findByUsername(String username);
}
