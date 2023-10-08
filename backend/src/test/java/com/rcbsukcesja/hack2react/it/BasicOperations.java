package com.rcbsukcesja.hack2react.it;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.mock.web.MockHttpServletResponse;

import java.io.UnsupportedEncodingException;
import java.util.List;

public class BasicOperations {

    <T> List<T> getListOfObjects(MockHttpServletResponse response, ObjectMapper objectMapper, Class<T> clazz)
            throws JsonProcessingException, UnsupportedEncodingException {
        return objectMapper.readValue(response.getContentAsString(), new TypeReference<>() {
        });
    }

    <T> T getObject(MockHttpServletResponse response, ObjectMapper objectMapper, Class<T> clazz)
            throws JsonProcessingException, UnsupportedEncodingException {
        return objectMapper.readValue(response.getContentAsString(), clazz);
    }
}
