package com.careerflow.careerflow;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/applications")
public class ApplicationController {

    private final ApplicationRepository applicationRepository;

    public ApplicationController(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @PostMapping
    public Application createApplication(@RequestBody Application application) {
        return applicationRepository.save(application);
    }

    @PutMapping("/{id}")
    public Application updateApplication(
        @PathVariable UUID id,
        @RequestBody Application updatedApplication) {
        
        Application existingApplication = 
            applicationRepository.findById(id)
                .orElseThrow();
        
        existingApplication.setCompany(updatedApplication.getCompany());
        existingApplication.setRole(updatedApplication.getRole());
        existingApplication.setStatus(updatedApplication.getStatus());
        existingApplication.setApplicationDate(
            updatedApplication.getApplicationDate());
        existingApplication.setNotes(
            updatedApplication.getNotes());

        return applicationRepository.save(existingApplication);
    }

    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable UUID id){
        applicationRepository.deleteById(id);
    }
}