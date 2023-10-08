package com.rcbsukcesja.hack2react.utils;

import lombok.experimental.UtilityClass;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;

@UtilityClass
public class TimeUtils {
    public OffsetDateTime now() {
        return OffsetDateTime.now(ZoneOffset.UTC).truncatedTo(ChronoUnit.SECONDS);
    }

    public boolean isCloseDeadline(LocalDate deadline) {
        return deadline.minusDays(7).isBefore(now().toLocalDate());
    }
}
