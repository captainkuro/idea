<?php namespace Idea\Validator;

use Idea\Validator;

class Login extends Validator {

	protected $rules = array(
		'username' => 'required|alpha_dash',
		'password' => 'required',
	);
	// @TODO check database
}