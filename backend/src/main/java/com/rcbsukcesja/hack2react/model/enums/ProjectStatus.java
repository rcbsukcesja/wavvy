package com.rcbsukcesja.hack2react.model.enums;

import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidEnumParameterException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public enum ProjectStatus {

    IDEA("pomysł", 1),
    PLANNED("planowany", 2),
    OBTAINING_FINANCING("pozyskiwanie finansowania", 3),
    IN_PROMOTION("w trakcie promocji", 4),
    IN_PROGRESS("w trakcie realizacji", 5),
    IN_SETTLEMENT("w trakcie rozliczania", 6),
    COMPLETED("zakończony", 7);

    private final String value;
    private final int id;

    public static ProjectStatus getById(int id) {
        return Arrays.stream(ProjectStatus.values())
                .filter(e -> e.id == id)
                .findFirst()
                .orElseThrow(() -> new InvalidEnumParameterException(ErrorMessages.INVALID_ENUM_ID, id));
    }

    public static ProjectStatus getByName(String name) {
        return Arrays.stream(ProjectStatus.values())
                .filter(e -> e.name().equals(name))
                .findFirst()
                .orElseThrow(() -> new InvalidEnumParameterException(ErrorMessages.INVALID_ENUM_NAME, name));
    }

    public static ProjectStatus getByValue(String value) {
        return Arrays.stream(ProjectStatus.values())
                .filter(e -> e.value.equals(value))
                .findFirst()
                .orElseThrow(() -> new InvalidEnumParameterException(ErrorMessages.INVALID_ENUM_VALUE, value));
    }

    public static Set<ProjectStatus> projectStatusesNotPublic() {
        return Set.of(IDEA, PLANNED, OBTAINING_FINANCING, IN_SETTLEMENT, COMPLETED);
    }

    public static boolean isProjectStatusNotAllowed(Collection<ProjectStatus> projectStatuses, Set<ProjectStatus> notAllowedProjectStatuses) {
        return projectStatuses.stream().anyMatch(notAllowedProjectStatuses::contains);
    }

    public static Set<ProjectStatus> getAllowedProjectStatuses(Set<ProjectStatus> notAllowedProjectStatuses) {
        return Arrays.stream(ProjectStatus.values())
                .filter(e -> !notAllowedProjectStatuses.contains(e))
                .collect(Collectors.toSet());
    }
}
