package com.rcbsukcesja.hack2react.it;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.dockerjava.zerodep.shaded.org.apache.hc.core5.http.HttpStatus;
import com.rcbsukcesja.hack2react.model.dto.save.OrganizationAddressSaveDto;
import com.rcbsukcesja.hack2react.model.dto.save.OrganizationNGOPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.OrganizationNGOSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOView;
import com.rcbsukcesja.hack2react.model.enums.LegalStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;


class NGOControllerIT extends AbstractContainerBaseTest {

    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @BeforeEach
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    void shouldReturnAllNGOs() throws Exception {
        // when
        MockHttpServletResponse response = mockMvc.perform(get("/ngos")).andReturn().getResponse();

        // then
        assertEquals(HttpStatus.SC_OK, response.getStatus());
        var listOfNGOs = getListOfObjects(response, objectMapper, OrganizationNGOView.class);
        assertEquals(3, listOfNGOs.size());
    }

    @Test
    void shouldReturnNGOById() throws Exception {
        // given
        UUID id = UUID.fromString("a9656db2-0d2e-11ee-be56-0242ac120002");

        // when
        MockHttpServletResponse response = mockMvc.perform(get("/ngos/" + id)).andReturn().getResponse();

        // then
        assertEquals(HttpStatus.SC_OK, response.getStatus());
        var ngo = getObject(response, objectMapper, OrganizationNGOView.class);
        assertEquals("name3", ngo.getName());
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void shouldDeleteNGOById() throws Exception {
        // given
        UUID id = UUID.fromString("a9656db2-0d2e-11ee-be56-0242ac120002");

        // when
        MockHttpServletResponse response = mockMvc.perform(delete("/ngos/" + id)).andReturn().getResponse();

        // then
        assertEquals(HttpStatus.SC_NO_CONTENT, response.getStatus());
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void shouldCreateNGO() throws Exception {
        // given
        UUID id = UUID.fromString("a9656db2-0d2e-11ee-be56-0242ac120002");
        mockMvc.perform(delete("/ngos/" + id));

        OrganizationNGOSaveDto dto = OrganizationNGOSaveDto.builder()
                .name("new NGO")
                .description("description of new NGO")
                .address(OrganizationAddressSaveDto.builder()
                        .country("country")
                        .city("city")
                        .street("street")
                        .zipCode("zipCode")
                        .build())
                .nip("1234567890")
                .krs("1234567890")
                .regon("1234567890")
                .phone("123456789")
                .email("email@ngo.pl")
                .website("www.ngo.pl")
                .socialLinks(Set.of("facebook.com/ngo", "twitter.com/ngo"))
                .resources(Set.of("resource1", "resource2"))
                .businessAreaIds(Set.of(UUID.fromString("ac0f9444-0d14-11ee-be56-0242ac120002"),
                        UUID.fromString("bd47cb32-0d14-11ee-be56-0242ac120002")))
                .legalStatus(LegalStatus.FOUNDATION)
                .build();

        // when
        MockHttpServletResponse response = mockMvc.perform(post("/ngos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andReturn().getResponse();

        // then
        assertEquals(HttpStatus.SC_CREATED, response.getStatus());
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void shouldUpdateNGOName() throws Exception {
        // given
        UUID id = UUID.fromString("a9656db2-0d2e-11ee-be56-0242ac120002");
        var dto = OrganizationNGOPatchDto.builder()
                .name("new NGO name")
                .build();

        // when
        MockHttpServletResponse response = mockMvc.perform(patch("/ngos/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andReturn().getResponse();

        // then
        assertEquals(HttpStatus.SC_OK, response.getStatus());
        var ngo = getObject(response, objectMapper, OrganizationNGOView.class);
        assertEquals("new NGO name", ngo.getName());
    }

    @Test
    void shouldReturn400WhenTryingToChangeNameToEmpty() throws Exception {
        // given
        UUID id = UUID.fromString("a9656db2-0d2e-11ee-be56-0242ac120002");
        var dto = OrganizationNGOPatchDto.builder()
                .name("   ")
                .build();

        // when
        MockHttpServletResponse response = mockMvc.perform(patch("/ngos/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andReturn().getResponse();

        // then
        assertEquals(HttpStatus.SC_BAD_REQUEST, response.getStatus());
    }

    @Test
    void shouldReturn400WhenTryingToChangeNameToExistingOne() throws Exception {
        // given
        UUID id = UUID.fromString("a9656db2-0d2e-11ee-be56-0242ac120002");
        var dto = OrganizationNGOPatchDto.builder()
                .name("name5")
                .build();

        // when
        MockHttpServletResponse response = mockMvc.perform(patch("/ngos/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andReturn().getResponse();

        // then
        assertEquals(HttpStatus.SC_BAD_REQUEST, response.getStatus());
    }
}
