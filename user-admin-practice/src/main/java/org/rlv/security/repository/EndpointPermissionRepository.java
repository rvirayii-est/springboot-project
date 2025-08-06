package org.rlv.security.repository;

import org.rlv.security.entity.EndpointPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EndpointPermissionRepository extends JpaRepository<EndpointPermission, Long> {
}
