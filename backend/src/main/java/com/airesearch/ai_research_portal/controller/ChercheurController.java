package com.airesearch.ai_research_portal.controller;

import com.airesearch.ai_research_portal.dto.ChercheurDTO;
import com.airesearch.ai_research_portal.model.Chercheur;
import com.airesearch.ai_research_portal.service.ChercheurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/chercheurs")
public class ChercheurController {

    @Autowired
    private ChercheurService chercheurService;

    @PostMapping
    public Chercheur addChercheur(@RequestBody Chercheur chercheur) {
        return chercheurService.addChercheur(chercheur);
    }

    @PutMapping("/{id}")
    public Optional<Chercheur> updateChercheur(@PathVariable Long id, @RequestBody Chercheur updatedChercheur) {
        return chercheurService.updateChercheur(id, updatedChercheur);
    }

    @GetMapping
    public List<ChercheurDTO> getAllChercheurs() {
        return chercheurService.getAllChercheurs();
    }

    @GetMapping("/{id}")
    public Optional<Chercheur> getChercheurById(@PathVariable Long id) {
        return chercheurService.getChercheurById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteChercheur(@PathVariable Long id) {
        chercheurService.deleteChercheur(id);
    }

    @GetMapping("/search")
    public List<Chercheur> findByAddress(@RequestParam(required = false) String address, @RequestParam(required = false) String workAddress, @RequestParam(required = false) String jobTitle) {
        return chercheurService.getByData(address, workAddress, jobTitle);
    }
}
