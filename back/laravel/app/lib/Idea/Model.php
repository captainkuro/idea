<?php namespace Idea;

class Model {

	protected static function getImplementationClass()
	{
		$db = \Config::get('database.default');
		$model_name = get_called_class();
		switch ($db) 
		{
			case 'sqlite':
			case 'mysql':
				$class_name = $model_name.'\Sql';
				break;
			case 'mongo':
				$class_name = $model_name.'\Mongo';
				break;
			default:
				throw new Exception('Implementation not found');
		}
		return $class_name;
	}

	/**
	 * Factory pattern, give correct implementation based on database configuration
	 */
	public static function factory()
	{
		$class_name = static::getImplementationClass();
		return new $class_name();
	}

	public static function __callStatic($name, $arguments)
	{
		$class_name = static::getImplementationClass();
		forward_static_call_array(array($class_name, $name), $arguments);
	}
}