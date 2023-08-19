package com.rcbsukcesja.hack2react.exceptions.handling;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.OffsetDateTime;


@NoArgsConstructor
@Getter
@Setter
public class ApiException {

    private String message;
    private String httpStatus;
    private String timeStamp;

    public ApiException(String message,
                        HttpStatus httpStatus,
                        OffsetDateTime timeStamp) {
        this.message = message;
        this.httpStatus = httpStatus.toString();
        this.timeStamp = timeStamp.toString();
    }
}
