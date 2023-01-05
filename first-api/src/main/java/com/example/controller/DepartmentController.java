package com.example.controller;

import com.example.model.Department;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
public class DepartmentController {
    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }

    @GetMapping("/departments")
    public ResponseEntity<?> getDepartments() {
        Department department1 = new Department(1, "D1");
        Department department2 = new Department(2, "D2");
        return ResponseEntity.status(HttpStatus.OK).body(Arrays.asList(department1, department2));
    }
}
