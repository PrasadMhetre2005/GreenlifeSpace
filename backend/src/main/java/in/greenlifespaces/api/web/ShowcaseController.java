package in.greenlifespaces.api.web;

import in.greenlifespaces.api.domain.ShowcaseProject;
import in.greenlifespaces.api.domain.ProjectStatus;
import in.greenlifespaces.api.repository.ShowcaseProjectRepository;
import in.greenlifespaces.api.repository.OfferRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
public class ShowcaseController {
    private final ShowcaseProjectRepository projects;
    private final OfferRepository offers;
    public ShowcaseController(ShowcaseProjectRepository projects, OfferRepository offers) { this.projects = projects; this.offers = offers; }

    @GetMapping("/api/showcase")
    @Transactional(readOnly = true)
    public List<ProjectResponse> publicProjects() { return projects.findByStatusOrderByCreatedAtDesc(ProjectStatus.published).stream().map(ProjectResponse::from).toList(); }

    @PostMapping("/api/admin/showcase")
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public ProjectResponse create(@Valid @RequestBody CreateProject input) {
        var selectedOffers = offers.findBySlugInAndActiveTrue(input.services());
        if (selectedOffers.size() != input.services().stream().distinct().count()) throw new NotFoundException("One or more service offers were not found.");
        var project = new ShowcaseProject(); project.setClientName(input.clientName().trim()); project.setLocation(input.location().trim());
        project.setDuration(input.duration().trim()); project.setSummary(input.summary().trim()); project.setVisualTone(input.visualTone()); project.setOffers(new HashSet<>(selectedOffers)); project.publish();
        return ProjectResponse.from(projects.save(project));
    }

    @PatchMapping("/api/admin/showcase/{id}/publish")
    @Transactional
    public ProjectResponse publish(@PathVariable UUID id) {
        var project = projects.findById(id).orElseThrow(() -> new NotFoundException("Showcase project not found."));
        project.publish(); return ProjectResponse.from(projects.save(project));
    }

    record CreateProject(@NotBlank @Size(max = 180) String clientName, @NotBlank @Size(max = 180) String location, @NotBlank @Size(max = 120) String duration, @NotBlank @Size(max = 5000) String summary, @NotBlank @Pattern(regexp = "moss|sage|ochre") String visualTone, @NotEmpty @Size(max = 10) List<@NotBlank @Size(max = 80) String> services) {}
    record ProjectResponse(UUID id, String clientName, String location, String duration, String summary, String visualTone, String status, List<String> services) {
        static ProjectResponse from(ShowcaseProject p) { return new ProjectResponse(p.getId(), p.getClientName(), p.getLocation(), p.getDuration(), p.getSummary(), p.getVisualTone(), p.getStatus(), p.getOffers().stream().map(offer -> offer.getSlug()).sorted().toList()); }
    }
}
