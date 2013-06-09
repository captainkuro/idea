<?php namespace Idea;

abstract class Validator {

	protected $validator;
	protected $rules;

	public function __construct($data)
	{
		$this->validator = \Validator::make($data, $this->rules);
	}

	public function valid()
	{
		return $this->validator->passes();
	}

	public function messages()
	{
		return $this->validator->messages()->all();
	}
}