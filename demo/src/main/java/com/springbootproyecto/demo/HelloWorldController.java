package com.springbootproyecto.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @GetMapping("/hola")
    public String decirHola() {
        return "¡Hola Mundo desde Spring Boot!";
    }
}
