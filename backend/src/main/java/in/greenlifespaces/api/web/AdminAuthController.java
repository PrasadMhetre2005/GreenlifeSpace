package in.greenlifespaces.api.web;

import in.greenlifespaces.api.config.AdminTokenService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/admin")
public class AdminAuthController {
    private final AdminTokenService tokenService;

    public AdminAuthController(AdminTokenService tokenService) {
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest input) {
        if (input == null || !tokenService.matchesAdminKey(input.adminKey())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid admin credentials");
        }
        return new LoginResponse(tokenService.issueToken());
    }

    public record LoginRequest(String adminKey) {}
    public record LoginResponse(String token) {}
}
