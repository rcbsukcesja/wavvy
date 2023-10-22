package com.rcbsukcesja.hack2react.converters;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

@Converter(autoApply = true)
public class ZonedDateTimeToLocalDateTimeConverter implements AttributeConverter<ZonedDateTime, LocalDateTime> {

    @Override
    public LocalDateTime convertToDatabaseColumn(ZonedDateTime zonedDateTime) {
        return zonedDateTime == null ? null : zonedDateTime.withZoneSameInstant(ZoneOffset.UTC).toLocalDateTime();
    }

    @Override
    public ZonedDateTime convertToEntityAttribute(LocalDateTime localDateTime) {
        return localDateTime == null ? null : localDateTime.atZone(ZoneOffset.UTC);
    }
}



