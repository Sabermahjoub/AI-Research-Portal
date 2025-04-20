package com.airesearch.ai_research_portal.service;

import com.airesearch.ai_research_portal.model.Role;
import com.airesearch.ai_research_portal.model.User;
import com.airesearch.ai_research_portal.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    // Méthode d'enregistrement de l'utilisateur
    public User register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    // Méthode de mise à jour d'un utilisateur
    public User updateUser(User updatedUser) {
        User existingUser = repo.findById(Math.toIntExact(updatedUser.getId()))
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'ID : " + updatedUser.getId()));

        if (updatedUser.getUsername() != null)
            existingUser.setUsername(updatedUser.getUsername());

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty())
            existingUser.setPassword(encoder.encode(updatedUser.getPassword()));

        if (updatedUser.getRole() != null)
            existingUser.setRole(updatedUser.getRole());

        return repo.save(existingUser);
    }

    // Méthode de vérification des identifiants et génération du token JWT
    public String verify(User user) {
        // Vérification des identifiants utilisateur avec AuthenticationManager
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );

        // Si l'authentification réussie, on génère un token JWT
        if (authentication.isAuthenticated()) {
            // Récupérer le rôle de l'utilisateur
            User authenticatedUser = repo.findByUsername(user.getUsername());
            Role role = authenticatedUser.getRole();

            // Ajouter l'autorité avec le rôle
            String roleName = "ROLE_" + role.name();  // Utilisation de name() pour obtenir la valeur du rôle sous forme de chaîne

            // Ajouter l'autorité à l'authentication
            authentication = new UsernamePasswordAuthenticationToken(user.getUsername(), null, Collections.singletonList(new SimpleGrantedAuthority(roleName)));

            // Retourner le token JWT généré
            return jwtService.generateToken(user.getUsername(), role.name());
        }

        // Si l'authentification échoue, retourner une réponse d'échec
        return "Failure";
    }

}
