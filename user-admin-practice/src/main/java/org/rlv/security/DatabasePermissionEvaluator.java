package org.rlv.security;

import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class DatabasePermissionEvaluator implements PermissionEvaluator {

    private final OrderRepository orderRepository; // Example repository

    public DatabasePermissionEvaluator(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
        // This method is for when the domain object is already loaded.
        if (targetDomainObject == null |

| authentication == null ||!(permission instanceof String)) {
            return false;
        }

        if (targetDomainObject instanceof Order) {
            Order order = (Order) targetDomainObject;
            String permissionString = (String) permission;
            return checkOrderPermission(authentication, order.getId(), permissionString);
        }

        return false;
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Object permission) {
        // This method is for when only the ID of the domain object is available.
        if (targetId == null || targetType == null || authentication == null ||!(permission instanceof String)) {
            return false;
        }

        if (targetType.equalsIgnoreCase("Order")) {
            Long orderId = (Long) targetId;
            String permissionString = (String) permission;
            return checkOrderPermission(authentication, orderId, permissionString);
        }

        return false;
    }

    private boolean checkOrderPermission(Authentication authentication, Long orderId, String permission) {
        // Check if the user has the general permission first (e.g., 'ORDER_EDIT')
        boolean hasGlobalPermission = authentication.getAuthorities().stream()
               .anyMatch(auth -> auth.getAuthority().equals(permission));
        if (!hasGlobalPermission) {
            return false;
        }

        // Now, perform the object-specific check (e.g., ownership)
        // This is a simplified example. A real implementation would be more robust.
        User user = (User) authentication.getPrincipal();
        return orderRepository.findById(orderId)
               .map(order -> order.getOwnerId().equals(user.getId()))
               .orElse(false);
    }
}