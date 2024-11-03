package com.edu.user_data.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.edu.user_data.entity.Response;
import com.edu.user_data.entity.User;
import com.edu.user_data.repository.UserRepository;
import com.edu.user_data.service.UserService;


@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.86.79:3000"})


@RestController
public class UserController {
	@Autowired
	protected UserRepository userRepository;
	
	@Autowired
	protected UserService userService;
	
	@PostMapping(value = "/users")
	protected ResponseEntity<Response<User>> addUser(@RequestBody User user) {
		User addedUser = userService.addUser(user);
		Response<User> response = new Response<>();
		response.setMessage("User added");
		response.setHttpStatusCode(HttpStatus.CREATED.value());
		response.setData(addedUser);
		return new ResponseEntity<Response<User>>(response, HttpStatus.CREATED);
	}
//	@GetMapping(value="/users")
//	protected ResponseEntity<Response<User>> findUserByEmailAndPassword(@RequestBody User user){
//		User user1 = userService.findUserByEmailAndPassword(user.getEmail(),user.getPassword());
//		Response<User> response = new Response<>();
//
//		if(user1 != null) {
//			response.setMessage("User Found");
//			response.setHttpStatusCode(HttpStatus.FOUND.value());
//			response.setData(user1);
//			return new ResponseEntity<Response<User>>(response, HttpStatus.FOUND);
//			}
//			else {
//				response.setMessage("User Not Found");
//				response.setHttpStatusCode(HttpStatus.FOUND.value());
//				response.setData(user1);
//				return new ResponseEntity<Response<User>>(response, HttpStatus.NOT_FOUND);
//			}
//	}
	@PostMapping(value = "/users/find")
    public ResponseEntity<Response<User>> findUserByEmailAndPassword(@RequestBody User user) {
        User foundUser = userService.findUserByEmailAndPassword(user.getEmail(), user.getPassword());
        Response<User> response = new Response<>();

        if (foundUser != null) {
            response.setMessage("User Found");
            response.setHttpStatusCode(HttpStatus.OK.value());
            response.setData(foundUser);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.setMessage("User Not Found");
            response.setHttpStatusCode(HttpStatus.NOT_FOUND.value());
            response.setData(null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
	@GetMapping(value="/users")
	protected List<User> findAllUsers(){
		List<User> users = userService.findAllUsers();
//		Response<List<User>> response = new Response<>();
//		if(users.size()>0) {
//			//response.setMessage("Users Found");
//			//response.setHttpStatusCode(HttpStatus.FOUND.value());
//			response.setData(users);
//			return new ResponseEntity<Response<List<User>>>(response, HttpStatus.FOUND);
//		}
//		else {
//			response.setMessage("Users Not Found");
//			response.setHttpStatusCode(HttpStatus.FOUND.value());
//			response.setData(users);
//			return new ResponseEntity<Response<List<User>>>(response, HttpStatus.NOT_FOUND);
//		}
//		
		return users;
 	}

}
