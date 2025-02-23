package com.airesearch.ai_research_portal.repository;

import com.airesearch.ai_research_portal.model.Publication2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Publication2_repo extends JpaRepository<Publication2, Long> {

    Optional<Publication2> findByIdPublication(long idPublication);
    List<Publication2> findByTitre(String titre);
    List<Publication2> findByDatePublication(String datePublication);
    void deleteById(long idPublication);

    // Find by mots-clés
    @Query(value="SELECT * FROM Publication WHERE resume LIKE %:keyword%",nativeQuery=true)
    List<Publication2> findByKeyWord(@Param("keyword") String keyword);


}
