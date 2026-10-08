package in.greenlifespaces.api.web;

import in.greenlifespaces.api.domain.Inquiry;
import in.greenlifespaces.api.domain.InquiryStatus;
import in.greenlifespaces.api.repository.InquiryRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/admin/inquiries")
public class AdminInquiryController {
    private final InquiryRepository inquiries;

    public AdminInquiryController(InquiryRepository inquiries) {
        this.inquiries = inquiries;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public List<InquiryResponse> list() {
        return inquiries.findAllByOrderByCreatedAtDesc().stream().map(InquiryResponse::from).toList();
    }

    @PatchMapping("/{id}")
    @Transactional
    public InquiryResponse update(@PathVariable("id") UUID id, @Valid @RequestBody UpdateInquiry input) {
        var inquiry = inquiries.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Inquiry not found."));
        inquiry.setStatus("new".equals(input.status()) ? InquiryStatus.new_status : InquiryStatus.valueOf(input.status()));
        inquiry.setInternalNotes(input.internalNotes() == null || input.internalNotes().isBlank() ? null : input.internalNotes().trim());
        return InquiryResponse.from(inquiry);
    }

    public record UpdateInquiry(@NotBlank @Pattern(regexp = "new|in_progress|resolved|archived") String status, @Size(max = 5000) String internalNotes) {}

    public record InquiryResponse(UUID id, String name, String phone, String email, String subject, String message, String status, String internalNotes, OffsetDateTime createdAt) {
        static InquiryResponse from(Inquiry inquiry) {
            return new InquiryResponse(inquiry.getId(), inquiry.getName(), inquiry.getPhone(), inquiry.getEmail(), inquiry.getSubject(), inquiry.getMessage(), inquiry.getStatus(), inquiry.getInternalNotes(), inquiry.getCreatedAt());
        }
    }
}