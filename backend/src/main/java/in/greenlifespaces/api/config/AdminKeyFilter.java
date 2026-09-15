package in.greenlifespaces.api.config;

import java.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class AdminKeyFilter extends OncePerRequestFilter {
    private final AdminTokenService tokenService;

    public AdminKeyFilter(AdminTokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            chain.doFilter(request, response);
            return;
        }
        if (request.getRequestURI().startsWith("/api/admin/") && !request.getRequestURI().equals("/api/admin/login")) {
            String authorization = request.getHeader("Authorization");
            String token = authorization != null && authorization.startsWith("Bearer ")
                    ? authorization.substring("Bearer ".length()).trim() : null;
            if (token == null || !tokenService.isValid(token)) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Admin authentication required");
                return;
            }
            SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken("admin-api-key", null, AuthorityUtils.createAuthorityList("ROLE_ADMIN")));
        }
        chain.doFilter(request, response);
    }
}
