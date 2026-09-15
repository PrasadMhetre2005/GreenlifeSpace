package in.greenlifespaces.api.web;

import in.greenlifespaces.api.domain.Offer;
import in.greenlifespaces.api.repository.OfferRepository;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/offers")
public class OfferController {
    private final OfferRepository offers;
    public OfferController(OfferRepository offers) { this.offers = offers; }

    @GetMapping
    public List<OfferResponse> list() {
        return offers.findByActiveTrueOrderByDisplayOrderAsc().stream().map(OfferResponse::from).toList();
    }

    record OfferResponse(String slug, String name, String shortDescription, String description, String startingPriceLabel, Double startingPriceInr) {
        static OfferResponse from(Offer offer) { return new OfferResponse(offer.getSlug(), offer.getName(), offer.getShortDescription(), offer.getDescription(), offer.getStartingPriceLabel(), offer.getStartingPriceInr()); }
    }
}
