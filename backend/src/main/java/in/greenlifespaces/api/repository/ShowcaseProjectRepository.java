package in.greenlifespaces.api.repository;

import in.greenlifespaces.api.domain.ShowcaseProject;
import in.greenlifespaces.api.domain.ProjectStatus;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowcaseProjectRepository extends JpaRepository<ShowcaseProject, UUID> {
    List<ShowcaseProject> findByStatusOrderByCreatedAtDesc(ProjectStatus status);
}
