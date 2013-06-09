<?php namespace Idea;

class Helper {
	
	public static function okReply($content)
	{
		$json = array(
			'status' => 'Ok',
			'content' => $content,
		);
		return ($json);
	}
	
	public static function errorReply($content)
	{
		$json = array(
			'status' => 'Error',
			'content' => $content,
		);
		return ($json);
	}
	
	public static function logoutReply($content)
	{
		$json = array(
			'status' => 'Logout',
			'content' => $content,
		);
		return ($json);
	}
}