package com.rcbsukcesja.hack2react.storage.user.enums;

public enum UserType {
    NGO,
    BUSINESS,
    CITY_HALL;

    public static UserType getByName(String name) {
        return UserType.valueOf(name.toUpperCase());
    }
}
