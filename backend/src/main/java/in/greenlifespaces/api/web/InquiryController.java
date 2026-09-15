package in.greenlifespaces.api.web;

import in.greenlifespaces.api.domain.Inquiry;
import in.greenlifespaces.api.repository.InquiryRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {
    private final InquiryRepository inquiries;
    public InquiryController(InquiryRepository inquiries) { this.inquiries = inquiries; }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public CreatedResponse create(@Valid @RequestBody CreateRequest input) {
        var inquiry = new Inquiry(); inquiry.setName(input.name().trim()); inquiry.setPhone(input.phone().trim());
        inquiry.setEmail(normalize(input.email())); inquiry.setSubject(input.subject().trim()); inquiry.setMessage(input.message().trim());
        var saved = inquiries.save(inquiry);
        return new CreatedResponse(saved.getId(), saved.getStatus(), saved.getCreatedAt());
    }
    private static String normalize(String value) { return value == null || value.isBlank() ? null : value.trim(); }
    public record CreateRequest(@NotBlank @Size(max = 160) String name, @NotBlank @Pattern(regexp = "^[+0-9 ()-]{7,40}$", message = "Enter a valid phone number") String phone, @Email @Size(max = 255) String email, @NotBlank @Size(max = 200) String subject, @NotBlank @Size(max = 5000) String message) {}
    public record CreatedResponse(UUID id, String status, java.time.OffsetDateTime createdAt) {}
}
