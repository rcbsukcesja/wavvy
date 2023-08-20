package com.rcbsukcesja.hack2react.model.dto.save;

import com.rcbsukcesja.hack2react.model.enums.LegalStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Builder
public record OrganizationNGODto(
        @NotNull(groups = CreateNGO.class, message = "Name cannot be null")
        @NotBlank(groups = {CreateNGO.class, UpdateNGO.class},
                message = "Name cannot be blank")
        String name,
        @NotNull(groups = CreateNGO.class, message = "Owner id cannot be null")
        @Pattern(message = "Owner id should be valid UUID",
                regexp = "^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$")
        UUID ownerId,
        @NotNull(groups = CreateNGO.class, message = "Address cannot be null")
        String address,
        @NotNull(groups = CreateNGO.class, message = "Phone cannot be null")
        @Pattern(groups = {CreateNGO.class, UpdateNGO.class},
                message = "Phone number should have 9 digits", regexp = "[0-9]{9}")
        String phone,
        @Email(groups = {CreateNGO.class, UpdateNGO.class}, message = "Email should be valid")
        String email,
        String website,
        List<String> socialLinks,
        String description,
        @NotNull(groups = CreateNGO.class, message = "Legal status cannot be null")
        @Size(groups = {CreateNGO.class, UpdateNGO.class},
                min = 1, message = "Business area ids cannot be empty")
        Set<UUID> businessAreaIds,
        String KRS,
        @NotNull(groups = CreateNGO.class, message = "NIP cannot be null")
        String NIP,
        @NotNull(groups = CreateNGO.class, message = "REGON cannot be null")
        String REGON,
        List<String> resources,
        @NotNull(groups = CreateNGO.class, message = "Legal status cannot be null")
        LegalStatus legalStatus
) {
    public interface CreateNGO {
    }

    public interface UpdateNGO {
    }
}
