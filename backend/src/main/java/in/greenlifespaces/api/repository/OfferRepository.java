package in.greenlifespaces.api.repository;

import in.greenlifespaces.api.domain.Offer;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfferRepository extends JpaRepository<Offer, UUID> {
    Optional<Offer> findBySlugAndActiveTrue(String slug);
    List<Offer> findByActiveTrueOrderByDisplayOrderAsc();
    List<Offer> findBySlugInAndActiveTrue(Collection<String> slugs);
}
