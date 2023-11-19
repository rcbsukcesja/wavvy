package com.rcbsukcesja.hack2react.storage.user.utils;

import lombok.experimental.UtilityClass;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;

@UtilityClass
public class TimeUtils {

    private static final String ZONE = "Europe/Warsaw";
    public static final ZoneId ZONE_ID = ZoneId.of(ZONE);
    public static final int CLOSE_DEADLINE_DAYS = 7;

    public ZonedDateTime nowInUTC() {
        return ZonedDateTime.now(ZoneOffset.UTC).truncatedTo(ChronoUnit.MICROS);
    }

    public ZonedDateTime nowInZone() {
        return ZonedDateTime.now(ZONE_ID).truncatedTo(ChronoUnit.MICROS);
    }

    public LocalDateTime toLocalDateTimeInZone(ZonedDateTime dateTime) {
        return dateTime.withZoneSameInstant(ZONE_ID).toLocalDateTime().truncatedTo(ChronoUnit.SECONDS);
    }

    public LocalDateTime toLocalDateTimeInUTC(ZonedDateTime dateTime) {
        return dateTime.withZoneSameInstant(ZoneOffset.UTC).toLocalDateTime().truncatedTo(ChronoUnit.SECONDS);
    }

    public ZonedDateTime zonedDateTimeInUTC(ZonedDateTime dateTime) {
        return dateTime.withZoneSameInstant(ZoneOffset.UTC).truncatedTo(ChronoUnit.MICROS);
    }

    public ZonedDateTime dateTimeInZone(ZonedDateTime dateTime) {
        return dateTime.withZoneSameInstant(ZONE_ID).truncatedTo(ChronoUnit.SECONDS);
    }

    public LocalDate today() {
        return nowInZone().toLocalDate();
    }

    public boolean isCloseDeadline(LocalDate deadline) {
        return deadline.minusDays(CLOSE_DEADLINE_DAYS).isBefore(today()) && !today().isAfter(deadline);
    }
}
