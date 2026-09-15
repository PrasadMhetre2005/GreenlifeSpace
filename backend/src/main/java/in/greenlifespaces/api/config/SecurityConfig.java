package in.greenlifespaces.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.http.HttpMethod;

@Configuration
public class SecurityConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, AdminKeyFilter adminKeyFilter) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/actuator/health", "/api/offers", "/api/showcase", "/api/service-requests", "/api/inquiries").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/admin/login").permitAll()
                        .requestMatchers("/api/admin/**").authenticated()
                        .anyRequest().denyAll())
                .addFilterBefore(adminKeyFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
