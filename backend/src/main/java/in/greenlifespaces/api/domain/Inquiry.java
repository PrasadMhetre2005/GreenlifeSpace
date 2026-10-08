package in.greenlifespaces.api.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "inquiries")
public class Inquiry {
    @Id @GeneratedValue(strategy = GenerationType.UUID) private UUID id;
    @Column(nullable = false, length = 160) private String name;
    @Column(nullable = false, length = 40) private String phone;
    @Column(length = 255) private String email;
    @Column(nullable = false, length = 200) private String subject;
    @Column(nullable = false, columnDefinition = "text") private String message;
    @Enumerated(EnumType.STRING) @JdbcTypeCode(SqlTypes.NAMED_ENUM) @Column(nullable = false, columnDefinition = "inquiry_status") private InquiryStatus status = InquiryStatus.new_status;
    @Column(name = "internal_notes", columnDefinition = "text") private String internalNotes;
    @Column(name = "created_at", nullable = false) private OffsetDateTime createdAt = OffsetDateTime.now();
    public void setName(String value) { name = value; }
    public void setPhone(String value) { phone = value; }
    public void setEmail(String value) { email = value; }
    public void setSubject(String value) { subject = value; }
    public void setMessage(String value) { message = value; }
    public void setStatus(InquiryStatus value) { status = value; }
    public void setInternalNotes(String value) { internalNotes = value; }
    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getPhone() { return phone; }
    public String getEmail() { return email; }
    public String getSubject() { return subject; }
    public String getMessage() { return message; }
    public String getStatus() { return status == InquiryStatus.new_status ? "new" : status.name(); }
    public String getInternalNotes() { return internalNotes; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
}
