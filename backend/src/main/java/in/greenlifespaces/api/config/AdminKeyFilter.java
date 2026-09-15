package in.greenlifespaces.api.config;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class AdminKeyFilter extends OncePerRequestFilter {
    @Value("${app.admin.api-key}")
    private String configuredKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            chain.doFilter(request, response);
            return;
        }
        if (request.getRequestURI().startsWith("/api/admin/")) {
            String suppliedKey = request.getHeader("X-Admin-Key");
            if (suppliedKey == null || !MessageDigest.isEqual(suppliedKey.getBytes(StandardCharsets.UTF_8), configuredKey.getBytes(StandardCharsets.UTF_8))) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Admin authentication required");
                return;
            }
            SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken("admin-api-key", null, AuthorityUtils.createAuthorityList("ROLE_ADMIN")));
        }
        chain.doFilter(request, response);
    }
}
