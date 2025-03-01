package com.airesearch.ai_research_portal.controller;

import com.airesearch.ai_research_portal.model.Commentaire;
import com.airesearch.ai_research_portal.service.CommentaireServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commentaire")

public class CommentaireController {
    @Autowired
    private CommentaireServiceImpl commentaireService;


    @GetMapping("/all")
    public List<Commentaire> getAllCommentaire() {
        return commentaireService.getCommentaires();
    }

    @GetMapping("/{id}")
    public Commentaire getCommentaireByID(@PathVariable int id) {
        return commentaireService.getCommentaireById(id);
    }

    @PostMapping("/add")
    public String addCommentaire(@RequestBody Commentaire commentaire) {
        commentaireService.addCommentaire(commentaire);
        return "Commentaire ajouté avec succes";
    }

    @PutMapping("/{id}")
    public Commentaire updateCommentaire(@RequestBody Commentaire commentaire, @PathVariable int id) {
        return commentaireService.updateCommentaire(commentaire);
    }

    @DeleteMapping("/{id}")
    public String deleteCommentaire(@PathVariable int id) {
        commentaireService.deleteCommentaire(id);
        return "commentaire supprimé avec succes";
    }
}
