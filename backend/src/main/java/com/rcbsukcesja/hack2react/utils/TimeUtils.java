package com.rcbsukcesja.hack2react.utils;

import lombok.experimental.UtilityClass;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;

@UtilityClass
public class TimeUtils {
    private static final String ZONE_ID = "Europe/Warsaw";

    public ZonedDateTime nowInUTC() {
        return ZonedDateTime.now(ZoneOffset.UTC).truncatedTo(ChronoUnit.MICROS);
    }

    public ZonedDateTime nowInZone() {
        return ZonedDateTime.now(ZoneId.of(ZONE_ID)).truncatedTo(ChronoUnit.MICROS);
    }

    public ZonedDateTime dateTimeInUTC(ZonedDateTime dateTime) {
        return dateTime.withZoneSameInstant(ZoneOffset.UTC).truncatedTo(ChronoUnit.SECONDS);
    }

    public ZonedDateTime dateTimeInZone(ZonedDateTime dateTime) {
        return dateTime.withZoneSameInstant(ZoneId.of(ZONE_ID)).truncatedTo(ChronoUnit.SECONDS);
    }

    public LocalDate today() {
        return nowInZone().toLocalDate();
    }

    public boolean isCloseDeadline(LocalDate deadline) {
        return deadline.minusDays(7).isBefore(today()) && !today().isAfter(deadline);
    }
}
