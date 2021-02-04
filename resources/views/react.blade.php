<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	 <meta charset="UTF-8">
	 <meta name="viewport"
			 content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	 <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap" rel="stylesheet">
	 <title>{{ $title }}</title>
</head>
<body>
	<div id="app-container"></div>


	<script type="text/javascript">
		@if($inject)
			@foreach($inject as $k=>$v)
        		window.{{$k}}= '{!! base64_encode(gzdeflate($v))!!}';
	 		@endforeach
	   @endif
		window._URL = path => `{{env('APP_URL')}}/${path}`;
      window.version = '{{env('APP_VERSION')}}';
</script>


{!! $scripts !!}
</body>
</html>
