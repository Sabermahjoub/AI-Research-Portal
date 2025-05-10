package com.airesearch.ai_research_portal.repository;

import com.airesearch.ai_research_portal.model.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, Long> {

    Optional<Publication> findById(long idPublication);
    List<Publication> findByTitle(String titre);
    List<Publication> findByPublicationDate(String publicationDate);
    void deleteById(long idPublication);

    // Find by mots-clés/keywords
    @Query(value="SELECT * FROM Publication WHERE description LIKE :keyword OR title LIKE :keyword", nativeQuery=true)
    List<Publication> findByKeyWord(@Param("keyword") String keyword);
    List<Publication> findByAcceptedIsNull();

    List<Publication> findByAccepted(Boolean accepted);

}