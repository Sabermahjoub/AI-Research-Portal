package com.airesearch.ai_research_portal.model;

import jakarta.persistence.Entity;

@Entity
public class Admin extends User{

    public Admin() {
        this.role = Role.ADMIN;
    }
}
