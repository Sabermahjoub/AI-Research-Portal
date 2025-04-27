package com.airesearch.ai_research_portal.controller;

import com.airesearch.ai_research_portal.model.Chercheur;
import com.airesearch.ai_research_portal.model.User;
import com.airesearch.ai_research_portal.repository.UserRepo;
import com.airesearch.ai_research_portal.service.ChercheurService;
import com.airesearch.ai_research_portal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.cors.CorsConfiguration;


import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(path = "users")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular frontend
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private UserRepo userepository;

    @Autowired
    private ChercheurService chercheurService;

    @PostMapping("/register")
    public Chercheur register(@RequestBody Chercheur user) {
        System.out.println(user);
        return chercheurService.register(user);
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

    @GetMapping
    public List<User> getUsers() {
        return userepository.findAll();
    }

}
