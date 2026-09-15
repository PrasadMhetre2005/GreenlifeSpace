package in.greenlifespaces.api.web;

import java.time.OffsetDateTime;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiError> validation(MethodArgumentNotValidException exception) {
        Map<String, String> fields = exception.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(error -> error.getField(), error -> error.getDefaultMessage(), (first, ignored) -> first));
        return ResponseEntity.badRequest().body(new ApiError("VALIDATION_ERROR", "Please correct the highlighted fields.", fields));
    }

    @ExceptionHandler(NotFoundException.class)
    ResponseEntity<ApiError> notFound(NotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiError("NOT_FOUND", exception.getMessage(), Map.of()));
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<ApiError> unexpected(Exception exception) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiError("INTERNAL_ERROR", "The request could not be completed.", Map.of()));
    }

    public record ApiError(String code, String message, Map<String, String> fields, OffsetDateTime timestamp) {
        ApiError(String code, String message, Map<String, String> fields) { this(code, message, fields, OffsetDateTime.now()); }
    }
}
