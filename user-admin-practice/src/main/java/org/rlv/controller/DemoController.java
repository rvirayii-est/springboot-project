package org.rlv.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/demo")
public class DemoController {

    @GetMapping("/user")
    public String userEndpoint() {
        return "Hello, User! You have USER_READ permission.";
    }

    @GetMapping("/admin")
    public String adminEndpoint() {
        return "Hello, Admin! You have ADMIN_READ permission.";
    }
}