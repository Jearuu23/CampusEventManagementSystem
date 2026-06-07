<?php

class Validator
{
	public static function string($value, $min = 1, $max = 255)
	{
		$val = trim((string) ($value ?? ''));
		$length = strlen($val);
		return $length >= $min && $length <= $max;
	}

	public static function email($value)
	{
		$val = trim((string) ($value ?? ''));
		return filter_var($val, FILTER_VALIDATE_EMAIL) !== false;
	}

	public static function int($value, $min = null, $max = null)
	{
		$options = [];
		if ($min !== null)
			$options['min_range'] = $min;
		if ($max !== null)
			$options['max_range'] = $max;

		$filterOptions = empty($options) ? 0 : ["options" => $options];
		return filter_var($value, FILTER_VALIDATE_INT, $filterOptions) !== false;
	}

	public static function date($value)
	{
		$d = DateTime::createFromFormat('Y-m-d', $value ?? '');
		return $d && $d->format('Y-m-d') === $value;
	}

	public static function time($value)
	{
		$d = DateTime::createFromFormat('H:i:s', $value ?? '');
		return $d && $d->format('H:i:s') === $value;
	}

	public static function in($value, array $allowedValues)
	{
		return in_array($value, $allowedValues, true);
	}
}