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
	$a = new \Idea\Model\User\Sql;
	print_r($a);
	$b = \Idea\Model\User::factory();
	print_r($b);
	// return View::make('empty');
});

// APIs
Route::post('/register', function()
{

});

Route::post('/login', function()
{

});

Route::get('/logout', function()
{

});
