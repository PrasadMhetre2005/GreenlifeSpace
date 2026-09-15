package in.greenlifespaces.api.repository;

import in.greenlifespaces.api.domain.ServiceRequest;
import java.util.UUID;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, UUID> {
	List<ServiceRequest> findAllByOrderByCreatedAtDesc();
}
