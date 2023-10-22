package com.rcbsukcesja.hack2react.converters;

import com.rcbsukcesja.hack2react.model.enums.ProjectStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class ProjectStatusConverter implements AttributeConverter<ProjectStatus, Integer> {

    @Override
    public Integer convertToDatabaseColumn(ProjectStatus projectStatus) {
        return projectStatus == null ? null : projectStatus.getId();
    }

    @Override
    public ProjectStatus convertToEntityAttribute(Integer databaseValue) {
        return databaseValue == null ? null : ProjectStatus.getById(databaseValue);
    }
}



