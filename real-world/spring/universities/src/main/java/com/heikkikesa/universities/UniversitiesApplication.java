package com.heikkikesa.universities;

import java.io.File;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class UniversitiesApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(UniversitiesApplication.class, args);
	}
	
	@GetMapping("/")
	public List<University> getUniversities(@RequestParam(required = false, value = "country") String country) {

		try {
			ObjectMapper mapper = new ObjectMapper();

			Resource resource = new ClassPathResource("static/universities.json");
    	File file = resource.getFile();
	
			List<University> universities = Arrays.asList(mapper.readValue(file, University[].class));
				
			Predicate<University> streamsPredicate = item -> item.getCountry().equals(country);

    	List<University> filtered = universities.stream()
      	.filter(streamsPredicate)
      	.collect(Collectors.toList());

			return filtered;
		} catch (Exception ex) {
				ex.printStackTrace();
		}

		return Collections.emptyList();
	}
}
