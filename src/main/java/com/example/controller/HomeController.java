package com.example.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {
	
  	@GetMapping("/display")
  	public ResponseEntity<Resource> display(String file) {
  		Resource resource = new FileSystemResource("d:" + file);
  		if(!resource.exists()) 
  			return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND);
  		HttpHeaders header = new HttpHeaders();
  		try{
  			Path filePath = Paths.get("d:" + file);
  			header.add("Content-type", Files.probeContentType(filePath));
  		}catch(Exception e) {
  			System.out.println("오류:" + e.toString());
  		}
  		return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
  	}
  	
   
    @ResponseBody    //html을 실행하지 않겠다.
    @GetMapping("/deleteFile")
    public void deleteFile(String file) {
       new File("d:/" + file).delete();
    }
}
