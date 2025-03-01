package com.airesearch.ai_research_portal.controller;

import com.airesearch.ai_research_portal.model.Commentaire;
import com.airesearch.ai_research_portal.service.CommentaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/commentaires")

public class CommentaireController {
    @Autowired
    private CommentaireService commentaireService;


    @GetMapping
    public ResponseEntity<Object> getAllCommentaire() {
        try {
            List<Commentaire> commentaires = this.commentaireService.getCommentaires();
            if (commentaires.isEmpty() || commentaires == null ){
                return new ResponseEntity<>(Collections.singletonMap("error", "Commentaires not found"), HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(commentaires, HttpStatus.OK);

        }
        catch(Exception e) {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("error", e.getMessage());
            return new ResponseEntity<>(responseBody,HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get_by_id/{idCommentaire}")
    //@PreAuthorize("hasAnyRole('user','admin')")
    public ResponseEntity<Object> getCommentaireById(@PathVariable("idCommentaire") long idCommentaire) throws Exception {

        try {
            Commentaire commentaire = this.commentaireService.getCommentaireById(idCommentaire);
            return new ResponseEntity<>(commentaire, HttpStatus.OK);
        }
        // RuntimeException
        catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
        // Other exceptions
        catch(Exception e) {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("error", e.getMessage());
            return new ResponseEntity<>(responseBody,HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping
    public ResponseEntity<Object> createCommentaire (@RequestBody Commentaire commentaire_body) throws Exception {
        try {
            Commentaire commentaire = this.commentaireService.addCommentaire(commentaire_body);
            return new ResponseEntity<>(commentaire,HttpStatus.CREATED);
        }
        catch (Exception e) {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("error", e.getMessage());
            return new ResponseEntity<>(responseBody,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/get_by_publication/{idPublication}")
    public ResponseEntity<Object> getAllCommentsByPublication(@PathVariable("idPublication") long idPublication) throws Exception {
        try {
            List<Commentaire> commentaires = this.commentaireService.getAllCommentsByPublication(idPublication);
            if (commentaires == null || commentaires.isEmpty()) {
                return new ResponseEntity<>(Collections.singletonMap("error", "Commentaires not found"), HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(commentaires, HttpStatus.OK);
        }
        // Other exceptions
        catch(Exception e) {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("error", e.getMessage());
            return new ResponseEntity<>(responseBody,HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity<Object> updateCommentaire(@RequestBody Commentaire commentaire_body) throws Exception {
        try {
            Commentaire commentaire = this.commentaireService.updateCommentaire(commentaire_body);
            if (commentaire != null) {
                return new ResponseEntity<>("Commentaire updated successfully",HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>("Cannot update commentaire",HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        // Other exceptions
        catch(Exception e) {
            return new ResponseEntity<>("Cannot update commentaire : "+e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{idCommentaire}")
    public ResponseEntity<String> deleteCommentaire(@PathVariable("idCommentaire") long idCommentaire) throws Exception {

        try {
            this.commentaireService.deleteCommentaire(idCommentaire);
            return new ResponseEntity<>("Commentaire deleted successfully", HttpStatus.OK);

        }
        // Other exceptions
        catch(Exception e) {
            return new ResponseEntity<>("Cannot delete Commentaire",HttpStatus.NOT_FOUND);
        }

    }
}
