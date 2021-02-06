package com.heikkikesa.microserviceclient;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@RestController
public class MicroserviceclientApplication {
	@Autowired
	private DiscoveryClient discoveryClient;

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceclientApplication.class, args);
	}

	@GetMapping("/")
	public String requestHelloworld() {
		List<ServiceInstance> instances = discoveryClient.getInstances("spring-helloworld");
		ServiceInstance serviceInstance = instances.get(0);
		String url = serviceInstance.getUri().toString();
		// log.Info(url);
		// System.out.println(url);
		RestTemplate restTemplate = new RestTemplate();
		HelloworldObject helloworldObject = restTemplate.getForObject(url, HelloworldObject.class);
		// System.out.println(helloworldObject.getData());
		
		return helloworldObject.getData();
	}
}
