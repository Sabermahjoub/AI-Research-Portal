package com.airesearch.ai_research_portal.controller;

import com.airesearch.ai_research_portal.model.Commentaire;
import com.airesearch.ai_research_portal.service.Commentaire_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/Commentaires")
public class Commentaire_controller {

    @Autowired
    private Commentaire_service commService;

    @PostMapping("/create_commentaire")
    public ResponseEntity<Object> createCommentaire(@RequestBody Commentaire commentaire) throws Exception {
        try {
            Commentaire commentaire_body = this.commService.createCommentaire(commentaire);
            if (commentaire_body != null) {
                return new ResponseEntity<>(commentaire_body, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("Error while trying to create a new comment", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("error", e.getMessage());
            return new ResponseEntity<>(responseBody, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{idCommentaire}")
    public ResponseEntity<String> deleteCommentaire(@PathVariable("idCommentaire") long idCommentaire) throws Exception {

        try {
            this.commService.deleteCommentaire(idCommentaire);
            return new ResponseEntity<>("Commentaire deleted successfully", HttpStatus.NOT_FOUND);

        }
        // Other exceptions
        catch (Exception e) {
            return new ResponseEntity<>("Cannot delete commentaire", HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/getByPublication/{idPublication}")
    public ResponseEntity<?> getCommentairesByPublication(@PathVariable("idPublication") long idPublication) throws Exception {

        try {
            List<Commentaire> commentaires = this.commService.getAllCommentsByPublication(idPublication);
            if (commentaires == null || commentaires.isEmpty()) {
                return new ResponseEntity<>(Collections.singletonMap("error", "Publication not found"), HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(commentaires, HttpStatus.OK);
        }
        // Other exceptions
        catch (Exception e) {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("error", e.getMessage());
            return new ResponseEntity<>(responseBody, HttpStatus.NOT_FOUND);
        }

    }

    @PutMapping("/updateCommentaire")
    public ResponseEntity<String> updateCommentaire(@RequestBody Commentaire commentaire) throws Exception {
        try {
            Commentaire comm = this.commService.updateCommentaire(commentaire);
            if (comm != null) {
                return new ResponseEntity<>("Successfully updated comment", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("Error while trying to update comment", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("error", e.getMessage());
            return new ResponseEntity<>(responseBody, HttpStatus.NOT_FOUND);
        }
    }

}
