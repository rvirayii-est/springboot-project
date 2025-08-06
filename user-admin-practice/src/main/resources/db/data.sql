-- Insert Permissions (authorities) if they don't exist
INSERT IGNORE INTO permissions (name) VALUES
('USER_READ'), ('USER_WRITE'), ('ADMIN_READ'), ('ADMIN_WRITE'),
('MANAGE_USERS'), ('MANAGE_ROLES'), ('MANAGE_ENDPOINT_SECURITY');

-- Insert Roles if they don't exist
INSERT IGNORE INTO roles (name) VALUES ('ROLE_USER'), ('ROLE_ADMIN'), ('ROLE_SUPER_ADMIN');

-- Assign Permissions to Roles if the assignments don't exist
-- ROLE_USER gets basic read permissions
INSERT IGNORE INTO roles_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.name = 'ROLE_USER' AND p.name IN ('USER_READ');

-- ROLE_ADMIN gets admin read/write and user management permissions
INSERT IGNORE INTO roles_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.name = 'ROLE_ADMIN' AND p.name IN ('ADMIN_READ', 'ADMIN_WRITE', 'MANAGE_USERS', 'MANAGE_ROLES');

-- ROLE_SUPER_ADMIN gets all permissions
INSERT IGNORE INTO roles_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.name = 'ROLE_SUPER_ADMIN';

-- Insert a default admin user if it doesn't exist (password is 'admin')
-- Hashed with BCryptPasswordEncoder
INSERT IGNORE INTO users (username, password, email, enabled) VALUES
('admin', '$2a$10$IqTJTjn39IU5.7sSCDQxzu3xug6z/LPU6IF0azE/8CkHCwYEnwBX.', 'admin@example.com', 1);

-- Assign ROLE_SUPER_ADMIN to the admin user if the assignment doesn't exist
INSERT IGNORE INTO users_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r WHERE u.username = 'admin' AND r.name = 'ROLE_SUPER_ADMIN';

-- Secure the Management API endpoints
INSERT IGNORE INTO endpoint_permissions (http_method, url_pattern, permission_id)
SELECT 'GET', '/api/management/users', p.id FROM permissions p WHERE p.name = 'MANAGE_USERS';
INSERT IGNORE INTO endpoint_permissions (http_method, url_pattern, permission_id)
SELECT 'GET', '/api/management/roles', p.id FROM permissions p WHERE p.name = 'MANAGE_ROLES';
INSERT IGNORE INTO endpoint_permissions (http_method, url_pattern, permission_id)
SELECT 'GET', '/api/management/endpoints/refresh', p.id FROM permissions p WHERE p.name = 'MANAGE_ENDPOINT_SECURITY';

-- Secure the Demo API endpoints
INSERT IGNORE INTO endpoint_permissions (http_method, url_pattern, permission_id)
SELECT 'GET', '/api/demo/user', p.id FROM permissions p WHERE p.name = 'USER_READ';
INSERT IGNORE INTO endpoint_permissions (http_method, url_pattern, permission_id)
SELECT 'GET', '/api/demo/admin', p.id FROM permissions p WHERE p.name = 'ADMIN_READ';