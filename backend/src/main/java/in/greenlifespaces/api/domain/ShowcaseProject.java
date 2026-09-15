package in.greenlifespaces.api.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "showcase_projects")
public class ShowcaseProject {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name = "client_name", nullable = false, length = 180)
    private String clientName;
    @Column(nullable = false, length = 180)
    private String location;
    @Column(nullable = false, length = 120)
    private String duration;
    @Column(nullable = false, columnDefinition = "text")
    private String summary;
    @Column(name = "visual_tone", nullable = false, length = 20)
    private String visualTone = "moss";
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(nullable = false, columnDefinition = "project_status")
    private ProjectStatus status = ProjectStatus.draft;
    @Column(name = "published_at")
    private OffsetDateTime publishedAt;
    @ManyToMany
    @JoinTable(name = "showcase_project_offers", joinColumns = @JoinColumn(name = "project_id"), inverseJoinColumns = @JoinColumn(name = "offer_id"))
    private Set<Offer> offers = new HashSet<>();
    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    public void setClientName(String value) {
        clientName = value;
    }

    public void setLocation(String value) {
        location = value;
    }

    public void setDuration(String value) {
        duration = value;
    }

    public void setSummary(String value) {
        summary = value;
    }

    public void setVisualTone(String value) {
        visualTone = value;
    }

    public void setOffers(Set<Offer> value) {
        offers = value;
    }

    public void publish() {
        status = ProjectStatus.published;
        publishedAt = OffsetDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public String getClientName() {
        return clientName;
    }

    public String getLocation() {
        return location;
    }

    public String getDuration() {
        return duration;
    }

    public String getSummary() {
        return summary;
    }

    public String getVisualTone() {
        return visualTone;
    }

    public String getStatus() {
        return status.name();
    }

    public Set<Offer> getOffers() {
        return offers;
    }
}
