package com.paytm.Plananizer.dao;

import org.springframework.data.repository.CrudRepository;

import com.paytm.Plananizer.model.Expenses;

public interface ExpensesRepo extends CrudRepository<Expenses, String> {
	
}
