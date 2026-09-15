package in.greenlifespaces.api.web;

import in.greenlifespaces.api.domain.ServiceRequest;
import in.greenlifespaces.api.repository.OfferRepository;
import in.greenlifespaces.api.repository.ServiceRequestRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/service-requests")
public class ServiceRequestController {
    private final ServiceRequestRepository requests;
    private final OfferRepository offers;
    public ServiceRequestController(ServiceRequestRepository requests, OfferRepository offers) { this.requests = requests; this.offers = offers; }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public CreatedResponse create(@Valid @RequestBody CreateRequest input) {
        var offer = offers.findBySlugAndActiveTrue(input.serviceSlug()).orElseThrow(() -> new NotFoundException("Service offer not found."));
        var request = new ServiceRequest();
        request.setOffer(offer); request.setCustomerName(input.customerName().trim()); request.setPhone(input.phone().trim());
        request.setEmail(normalize(input.email())); request.setAddress(input.address().trim()); request.setCity(input.city().trim());
        request.setPincode(input.pincode().trim()); request.setRequestedDate(input.requestedDate()); request.setNotes(normalize(input.notes()));
        var saved = requests.save(request);
        return new CreatedResponse(saved.getId(), saved.getStatus(), saved.getCreatedAt());
    }

    private static String normalize(String value) { return value == null || value.isBlank() ? null : value.trim(); }
    public record CreateRequest(
            @NotBlank @Size(max = 160) String customerName,
            @NotBlank @Pattern(regexp = "^[+0-9 ()-]{7,40}$", message = "Enter a valid phone number") String phone,
            @Email @Size(max = 255) String email,
            @NotBlank @Size(max = 80) String serviceSlug,
            @NotBlank @Size(max = 2000) String address,
            @NotBlank @Size(max = 100) String city,
            @NotBlank @Pattern(regexp = "^[A-Za-z0-9 -]{3,20}$", message = "Enter a valid pincode") String pincode,
            @NotNull @FutureOrPresent LocalDate requestedDate,
            @Size(max = 2000) String notes) {}
    public record CreatedResponse(UUID id, String status, java.time.OffsetDateTime createdAt) {}
}
