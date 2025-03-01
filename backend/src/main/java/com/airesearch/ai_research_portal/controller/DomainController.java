package com.airesearch.ai_research_portal.controller;

import com.airesearch.ai_research_portal.model.Domain;
import org.springframework.web.bind.annotation.*;
import com.airesearch.ai_research_portal.service.DomainService;
import java.util.List;

@RestController
@RequestMapping(path="domains")
public class DomainController {
    private DomainService domainService;

    public DomainController(DomainService domainService) {
        this.domainService = domainService;
    }

    @GetMapping
    public List<Domain> getAllDomains(){
        return domainService.getAllDomains();
    }

    @GetMapping(path="{domainId}")
    public Domain getDomainById(@PathVariable(name = "domainId") Long domainId){
        return domainService.getDomainById(domainId);
    }

    @PostMapping
    public void registerDomain(@RequestBody Domain domain) throws IllegalStateException{
        domainService.registerDomain(domain);
    }

    @DeleteMapping(path="{domainId}")
    public void deleteDomain(@PathVariable Long domainId){
        domainService.deleteDomain(domainId);
    }

    @PutMapping(path="{domainId}")
    public void updateDomain(@PathVariable(name = "domainId") Long domainId, @RequestParam(required = false) String domainName, @RequestParam(required = false) String domainDesc){
        System.out.println(domainName);
        domainService.updateDomain(domainId, domainName, domainDesc);
    }

    //TODO publication manipulation
}
