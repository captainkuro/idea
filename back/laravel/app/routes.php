<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	$user_collection = \Idea\Collection\User::factory();
	print_r($user_collection);
	$user_record = new \Idea\Record\User\Sql();
	print_r($user_record);
	// return View::make('empty');
});

// APIs
Route::post('/register', function()
{
	$validator = new \Idea\Validator\Registration(Input::all());
	if ($validator->valid())
	{
		// @TODO save to database
		return Response::json(\Idea\Helper::okReply('You have been registered'));
	} 
	else 
	{
		return Response::json(\Idea\Helper::errorReply($validator->messages()));
	}
});

Route::post('/login', function()
{
	$validator = new \Idea\Validator\Login(Input::all());
	if ($validator->valid())
	{
		// @TODO set the session
		return Response::json(\Idea\Helper::okReply('You have been logged in'));
	} 
	else 
	{
		return Response::json(\Idea\Helper::errorReply($validator->messages()));
	}
});

Route::get('/logout', function()
{
	return Response::json(\Idea\Helper::okReply('You have been logged out'));
});
