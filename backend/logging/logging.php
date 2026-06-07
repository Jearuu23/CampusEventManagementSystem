<?php

class Logger
{
	public static function log($message)
	{
		$logFile = __DIR__ . '/../logging/app.log';
		$logDir = dirname($logFile);

		if (!is_dir($logDir)) {
			mkdir($logDir, 0777, true);
		}

		// Get caller information (limit to 2 levels deep for performance)
		$trace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 2);

		// $trace[0] contains the file and line that called this method
		$file = isset($trace[0]['file']) ? basename($trace[0]['file']) : 'Unknown';

		// $trace[1] contains the function/method that called this method
		$function = isset($trace[1]['function']) ? $trace[1]['function'] : 'Global scope';

		$date = date('Y-m-d H:i:s');

		$formattedMessage = sprintf(
			"[%s] [File: %s] [Function: %s] %s" . PHP_EOL,
			$date,
			$file,
			$function,
			$message
		);

		file_put_contents($logFile, $formattedMessage, FILE_APPEND);
	}
}