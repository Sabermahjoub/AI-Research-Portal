package com.airesearch.ai_research_portal.controller;

import com.airesearch.ai_research_portal.model.User;
import com.airesearch.ai_research_portal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import com.airesearch.ai_research_portal.model.User;
import com.airesearch.ai_research_portal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping(path = "users")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        System.out.println(user);
        return service.register(user);
    }

    @PutMapping("/update")
    public User updateUser(@RequestBody User user, Principal principal) {
        // Vérification pour s'assurer que l'utilisateur modifie son propre compte
        if (!principal.getName().equals(user.getUsername())) {
            throw new RuntimeException("Vous ne pouvez modifier que votre propre compte.");
        }
        return service.updateUser(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        // Return JWT token upon successful login
        return service.verify(user);
    }
}
