<?php namespace Idea\Validator;

use Idea\Validator;

class Registration extends Validator {

	protected $rules = array(
		'username' => 'required|alpha_dash',
		'password' => 'required',
		'name' => 'required|/^[\w ]+$/',
	);
	// @TODO check database
}