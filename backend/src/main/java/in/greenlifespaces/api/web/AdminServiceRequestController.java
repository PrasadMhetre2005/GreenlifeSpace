package in.greenlifespaces.api.web;

import in.greenlifespaces.api.domain.RequestStatus;
import in.greenlifespaces.api.domain.ServiceRequest;
import in.greenlifespaces.api.repository.ServiceRequestRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/admin/service-requests")
public class AdminServiceRequestController {
    private final ServiceRequestRepository requests;

    public AdminServiceRequestController(ServiceRequestRepository requests) {
        this.requests = requests;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public List<RequestResponse> list() {
        return requests.findAllByOrderByCreatedAtDesc().stream().map(RequestResponse::from).toList();
    }

    @PatchMapping("/{id}")
    @Transactional
    public RequestResponse update(@PathVariable UUID id, @Valid @RequestBody UpdateRequest input) {
        var request = requests.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service request not found."));
        request.setStatus(input.status());
        request.setInternalNotes(normalize(input.internalNotes()));
        return RequestResponse.from(request);
    }

    public record UpdateRequest(@NotNull RequestStatus status, @Size(max = 5000) String internalNotes) {}

    public record RequestResponse(
            UUID id,
            String customerName,
            String phone,
            String email,
            String serviceSlug,
            String address,
            String city,
            String pincode,
            LocalDate requestedDate,
            String notes,
            String status,
            String internalNotes,
            OffsetDateTime createdAt) {
        static RequestResponse from(ServiceRequest request) {
            return new RequestResponse(request.getId(), request.getCustomerName(), request.getPhone(), request.getEmail(),
                    request.getServiceSlug(), request.getAddress(), request.getCity(), request.getPincode(),
                    request.getRequestedDate(), request.getNotes(), request.getStatus(), request.getInternalNotes(),
                    request.getCreatedAt());
        }
    }

    private static String normalize(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}