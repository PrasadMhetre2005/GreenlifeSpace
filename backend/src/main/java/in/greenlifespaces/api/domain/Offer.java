package in.greenlifespaces.api.domain;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "offers")
public class Offer {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false, unique = true, length = 80) private String slug;
    @Column(nullable = false, length = 160) private String name;
    @Column(name = "short_description", nullable = false, length = 240) private String shortDescription;
    @Column(nullable = false, columnDefinition = "text") private String description;
    @Column(name = "starting_price_label", nullable = false, length = 80) private String startingPriceLabel;
    @Column(name = "starting_price_inr") private Double startingPriceInr;
    @Column(name = "is_active", nullable = false) private boolean active = true;
    @Column(name = "display_order", nullable = false) private int displayOrder;
    public UUID getId() { return id; }
    public String getSlug() { return slug; }
    public String getName() { return name; }
    public String getShortDescription() { return shortDescription; }
    public String getDescription() { return description; }
    public String getStartingPriceLabel() { return startingPriceLabel; }
    public Double getStartingPriceInr() { return startingPriceInr; }
    public boolean isActive() { return active; }
    public int getDisplayOrder() { return displayOrder; }
}
