package com.joshuamatos.todopractice1;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.joshuamatos.todopractice1.backend.ToDo;
import net.minidev.json.JSONObject;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class ApplicationTests {

	@Autowired
	MockMvc mvc;
	String json;


	@Test
	void contextLoads()  throws Exception {
		this.mvc.perform(get("/api/items")).andExpect(status().isOk());
	}
	@Test
	void moreTest()  throws Exception {
		this.mvc.perform(get("/api/items")).andExpect(status().isOk());

		this.mvc.perform(get("/api/items")
				.contentType(APPLICATION_JSON))
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].content").value("This task I am putting in here will never be done"))
				.andExpect(jsonPath("$[0].completed").value(false));
	}

	@Test
	@Transactional
	@Rollback
	void moreTestTest() throws Exception {
		try {json = new ObjectMapper().writeValueAsString(new ToDo(2L, "content", true));}
		catch (JsonProcessingException e) {e.printStackTrace();}


		this.mvc.perform(post("/api/items/")
				.contentType(APPLICATION_JSON)
				.content(json)
		);

		this.mvc.perform(get("/api/items")
						.contentType(APPLICATION_JSON))
				.andExpect(jsonPath("$[1].id").value(2))
				.andExpect(jsonPath("$[1].content").value("content"))
				.andExpect(jsonPath("$[1].completed").value(true));
	}

	@Test
	@Transactional
	@Rollback
	void betterNamedTest() throws Exception {
		this.mvc.perform(delete("/api/items/1").contentType(APPLICATION_JSON));
		this.mvc.perform(get("/api/items/").contentType(APPLICATION_JSON))
				.andExpect(jsonPath("$[0].id").doesNotExist());
	}

	@Test
	@Transactional
	@Rollback
	void anotherBetterNamedTest() throws Exception {
		try {json = new ObjectMapper().writeValueAsString(new ToDo("name", true));}
		catch  (JsonProcessingException e) { e.printStackTrace();}
		this.mvc.perform(patch("/api/items/1").contentType(APPLICATION_JSON).content(json));

		try {json = new ObjectMapper().writeValueAsString(new ToDo("name", false));}
		catch  (JsonProcessingException e) { e.printStackTrace();}
		this.mvc.perform(patch("/api/items/1").contentType(APPLICATION_JSON).content(json));

		this.mvc.perform(get("/api/items").contentType(APPLICATION_JSON))
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].content").value("name"))
				.andExpect(jsonPath("$[0].completed").value(false));
	}

}
