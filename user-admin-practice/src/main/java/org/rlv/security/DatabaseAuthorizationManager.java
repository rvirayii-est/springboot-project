package org.rlv.security;

import jakarta.servlet.http.HttpServletRequest;

import org.rlv.entity.EndpointPermission;
import org.rlv.repository.EndpointPermissionRepository;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Supplier;

@Component
public class DatabaseAuthorizationManager implements AuthorizationManager<RequestAuthorizationContext> {

    private final EndpointPermissionRepository endpointPermissionRepository;
    private final Map<AntPathRequestMatcher, String> permissionCache = new ConcurrentHashMap<>();

    public DatabaseAuthorizationManager(EndpointPermissionRepository endpointPermissionRepository) {
        this.endpointPermissionRepository = endpointPermissionRepository;
        loadPermissions();
    }

    public void loadPermissions() {
        List<EndpointPermission> permissions = endpointPermissionRepository.findAll();
        permissionCache.clear();
        for (EndpointPermission p : permissions) {
            permissionCache.put(
                    new AntPathRequestMatcher(p.getUrlPattern(), p.getHttpMethod()),
                    p.getPermission().getName()
            );
        }
    }

    @Override
    public AuthorizationDecision check(Supplier<Authentication> authentication, RequestAuthorizationContext object) {
        HttpServletRequest request = object.getRequest();
        Authentication auth = authentication.get();

        for (Map.Entry<AntPathRequestMatcher, String> entry : permissionCache.entrySet()) {
            if (entry.getKey().matches(request)) {
                String requiredPermission = entry.getValue();
                boolean hasPermission = auth.getAuthorities().stream()
                       .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(requiredPermission));
                return new AuthorizationDecision(hasPermission);
            }
        }
        // By default, deny access if no specific rule is found for the endpoint.
        // This is a "fail-safe" approach.
        return new AuthorizationDecision(false);
    }
}