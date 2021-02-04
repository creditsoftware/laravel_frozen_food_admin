<?php

namespace App\Http\Middleware;

use Closure;

class ApiAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $key = $request->header('Authorization');

        if(!$key || $key !== env('API_TOKEN'))
            return response(['err' => 'invalid authorization'], 400);

        return $next($request);
    }
}
