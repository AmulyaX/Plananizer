package com.paytm.Plananizer.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paytm.Plananizer.dao.ExpensesRepo;
import com.paytm.Plananizer.model.Expenses;

@RestController
public class ExpensesController {
	
	@Autowired
	ExpensesRepo repo; 
	
	@RequestMapping("/")
	public List<Expenses> home()
	{
		return (List<Expenses>)repo.findAll();
	}
	
	@PostMapping("/")
	public Expenses createEntry(@Valid @RequestBody Expenses exp) {
		return repo.save(exp);
	}
	
}
