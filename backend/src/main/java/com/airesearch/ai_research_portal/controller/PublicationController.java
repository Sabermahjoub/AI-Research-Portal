package com.airesearch.ai_research_portal.controller;

import com.airesearch.ai_research_portal.model.Publication;
import com.airesearch.ai_research_portal.service.PublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/publications")
public class PublicationController {

    @Autowired
    private PublicationService pubService;

    @GetMapping("/getById/{idPublication}")
    //@PreAuthorize("hasAnyRole('user','admin')")
    public ResponseEntity<Object> getPublicationById(@PathVariable("idPublication") long idPublication) throws Exception {

        try {
            Publication pub = this.pubService.getPublicationById(idPublication);
            return new ResponseEntity<>(pub, HttpStatus.OK);
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

    @GetMapping("/getByTitre/{titre}")
    public ResponseEntity<?> getPublicationByTitre(@PathVariable("titre") String titre) throws Exception {

        try {
            List<Publication> pub = this.pubService.getPublicationByTitre(titre);
            if (pub == null || pub.isEmpty()) {
                return new ResponseEntity<>(Collections.singletonMap("error", "Publication not found"), HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(pub, HttpStatus.OK);
        }
        // Other exceptions
        catch(Exception e) {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("error", e.getMessage());
            return new ResponseEntity<>(responseBody,HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/getByDate/{date}")
    public ResponseEntity<Object> getPublicationByDate(@PathVariable("date") String date) throws Exception {

        try {
            List<Publication> pub = this.pubService.getPublicationByDate(date);
            if (pub == null || pub.isEmpty()) {
                return new ResponseEntity<>(Collections.singletonMap("error", "Publication not found"), HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(pub, HttpStatus.OK);
        }
        // Other exceptions
        catch(Exception e) {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("error", e.getMessage());
            return new ResponseEntity<>(responseBody,HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/getAll")
    public ResponseEntity<Object> getAllPublications() throws Exception {

        try {
            List<Publication> pub = this.pubService.getAllPublications();
            if (pub == null || pub.isEmpty()) {
                return new ResponseEntity<>(Collections.singletonMap("error", "Publications not found"), HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(pub, HttpStatus.OK);
        }
        // Other exceptions
        catch(Exception e) {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("error", e.getMessage());
            return new ResponseEntity<>(responseBody,HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/get_all_by_acceptance/{isAccepted}")
    public ResponseEntity<Object> getAllPublicationsByAcceptance(@PathVariable("isAccepted") boolean isAccepted) throws Exception {

        try {
            List<Publication> pub = this.pubService.getPublicationsByAcceptance(isAccepted);
            if (pub == null || pub.isEmpty()) {
                return new ResponseEntity<>(Collections.singletonMap("error", "Publications not found"), HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(pub, HttpStatus.OK);
        }
        // Other exceptions
        catch(Exception e) {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("error", e.getMessage());
            return new ResponseEntity<>(responseBody,HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/get_all_by_keyword/{keyword}")
    public ResponseEntity<Object> getAllPublicationsByKeyWord(@PathVariable("keyword") String keyword) throws Exception {

        try {
            List<Publication> pubs = this.pubService.getPublicationByKeyWord(keyword);
            if (pubs == null || pubs.isEmpty()) {
                return new ResponseEntity<>(Collections.singletonMap("error", "Publications not found"), HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(pubs, HttpStatus.OK);
        }
        // exceptions
        catch(Exception e) {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("error", e.getMessage());
            return new ResponseEntity<>(responseBody,HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/{idPublication}")
    public ResponseEntity<String> deletePublication(@PathVariable("idPublication") long idPublication) throws Exception {

        try {
            this.pubService.deletePublication(idPublication);
            return new ResponseEntity<>("Publication deleted successfully",HttpStatus.OK);

        }
        // Other exceptions
        catch(Exception e) {
            return new ResponseEntity<>("Cannot delete publication",HttpStatus.NOT_FOUND);
        }

    }

    @PutMapping
    public ResponseEntity<Object> updatePublication(@RequestBody Publication publication_body) throws Exception {

        try {
            Publication publication = this.pubService.updatePublication(publication_body);
            return new ResponseEntity<>(publication,HttpStatus.OK);
        }
        // Other exceptions
        catch (Exception e) {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("error", e.getMessage());
            return new ResponseEntity<>(responseBody,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @PostMapping
    public ResponseEntity<Object> createPublication (@RequestBody Publication publication_body) throws Exception {
        try {
            Publication publication = this.pubService.createPublication(publication_body);
            return new ResponseEntity<>(publication,HttpStatus.CREATED);
        }
        catch (Exception e) {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("error", e.getMessage());
            return new ResponseEntity<>(responseBody,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}