package in.greenlifespaces.api.config;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AdminTokenService {
    private static final String HMAC_ALGORITHM = "HmacSHA256";
    private static final Base64.Encoder ENCODER = Base64.getUrlEncoder().withoutPadding();
    private static final Base64.Decoder DECODER = Base64.getUrlDecoder();

    private final String adminKey;
    private final Duration tokenLifetime;

    public AdminTokenService(
            @Value("${app.admin.api-key}") String adminKey,
            @Value("${app.admin.token-lifetime:PT8H}") Duration tokenLifetime) {
        this.adminKey = adminKey;
        this.tokenLifetime = tokenLifetime;
    }

    public boolean matchesAdminKey(String suppliedKey) {
        return suppliedKey != null && MessageDigest.isEqual(
                suppliedKey.getBytes(StandardCharsets.UTF_8), adminKey.getBytes(StandardCharsets.UTF_8));
    }

    public String issueToken() {
        String expiry = Long.toString(Instant.now().plus(tokenLifetime).getEpochSecond());
        return expiry + "." + sign(expiry);
    }

    public boolean isValid(String token) {
        try {
            String[] parts = token.split("\\.", -1);
            if (parts.length != 2 || Instant.now().getEpochSecond() >= Long.parseLong(parts[0])) {
                return false;
            }
            return MessageDigest.isEqual(DECODER.decode(sign(parts[0])), DECODER.decode(parts[1]));
        } catch (IllegalArgumentException exception) {
            return false;
        }
    }

    private String sign(String value) {
        try {
            Mac mac = Mac.getInstance(HMAC_ALGORITHM);
            mac.init(new SecretKeySpec(adminKey.getBytes(StandardCharsets.UTF_8), HMAC_ALGORITHM));
            return ENCODER.encodeToString(mac.doFinal(value.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception exception) {
            throw new IllegalStateException("Admin token signing is unavailable", exception);
        }
    }
}
