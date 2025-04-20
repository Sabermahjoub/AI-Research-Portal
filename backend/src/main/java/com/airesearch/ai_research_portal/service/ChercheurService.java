package com.airesearch.ai_research_portal.service;

import com.airesearch.ai_research_portal.dto.ChercheurDTO;
import com.airesearch.ai_research_portal.model.Chercheur;
import com.airesearch.ai_research_portal.model.Role;
import com.airesearch.ai_research_portal.repository.ChercheurRepository;
import com.airesearch.ai_research_portal.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChercheurService {

    @Autowired
    private ChercheurRepository chercheurRepository;

    @Autowired
    private UserRepo repo;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    // Méthode d'enregistrement de l'utilisateur
    public Chercheur register(Chercheur user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return chercheurRepository.save(user);
    }

    // Méthode de mise à jour d'un utilisateur
    public Chercheur updateUser(Chercheur updatedUser) {
        Chercheur existingUser = chercheurRepository.findById(updatedUser.getId())
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
    public String verify(Chercheur user) {
        // Vérification des identifiants utilisateur avec AuthenticationManager
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );

        // Si l'authentification réussie, on génère un token JWT
        if (authentication.isAuthenticated()) {
            // Récupérer le rôle de l'utilisateur
            Chercheur authenticatedUser = chercheurRepository.findByUsername(user.getUsername());
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
