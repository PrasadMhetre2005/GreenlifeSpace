package in.greenlifespaces.api.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "service_requests")
public class ServiceRequest {
    @Id @GeneratedValue(strategy = GenerationType.UUID) private UUID id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "offer_id") private Offer offer;
    @Column(name = "customer_name", nullable = false, length = 160) private String customerName;
    @Column(nullable = false, length = 40) private String phone;
    @Column(length = 255) private String email;
    @Column(nullable = false, columnDefinition = "text") private String address;
    @Column(nullable = false, length = 100) private String city;
    @Column(nullable = false, length = 20) private String pincode;
    @Column(name = "requested_date", nullable = false) private LocalDate requestedDate;
    @Column(columnDefinition = "text") private String notes;
    @Column(name = "internal_notes", columnDefinition = "text") private String internalNotes;
    @Enumerated(EnumType.STRING) @JdbcTypeCode(SqlTypes.NAMED_ENUM) @Column(nullable = false, columnDefinition = "request_status") private RequestStatus status = RequestStatus.pending;
    @Column(name = "created_at", nullable = false) private OffsetDateTime createdAt = OffsetDateTime.now();
    public void setOffer(Offer offer) { this.offer = offer; }
    public void setCustomerName(String value) { customerName = value; }
    public void setPhone(String value) { phone = value; }
    public void setEmail(String value) { email = value; }
    public void setAddress(String value) { address = value; }
    public void setCity(String value) { city = value; }
    public void setPincode(String value) { pincode = value; }
    public void setRequestedDate(LocalDate value) { requestedDate = value; }
    public void setNotes(String value) { notes = value; }
    public void setStatus(RequestStatus value) { status = value; }
    public void setInternalNotes(String value) { internalNotes = value; }
    public UUID getId() { return id; }
    public String getCustomerName() { return customerName; }
    public String getPhone() { return phone; }
    public String getEmail() { return email; }
    public String getAddress() { return address; }
    public String getCity() { return city; }
    public String getPincode() { return pincode; }
    public LocalDate getRequestedDate() { return requestedDate; }
    public String getNotes() { return notes; }
    public String getStatus() { return status.name(); }
    public String getServiceSlug() { return offer.getSlug(); }
    public String getInternalNotes() { return internalNotes; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
}
