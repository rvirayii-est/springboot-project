package org.rlv.controller;

import lombok.RequiredArgsConstructor;

import org.rlv.security.DatabaseAuthorizationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/management")
public class ManagementController {

    private final DatabaseAuthorizationManager authorizationManager;

    // A simple endpoint to demonstrate management functionality
    @GetMapping("/users")
    public List<String> listUsers() {
        // In a real app, this would fetch from a UserService
        return List.of("admin", "user1", "user2");
    }

    @GetMapping("/roles")
    public List<String> listRoles() {
        // In a real app, this would fetch from a RoleService
        return List.of("ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN");
    }

    @GetMapping("/endpoints/refresh")
    public String refreshEndpointPermissions() {
        authorizationManager.loadPermissions();
        return "Endpoint permissions cache has been refreshed.";
    }
} 
