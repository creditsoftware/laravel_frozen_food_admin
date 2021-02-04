<?php

namespace App\Http\Middleware;

use Closure;

class JsonContent
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->method() == 'POST' && !$request->isJson())
            return response(['err' => 'not json'], 400);

        return $next($request);

    }
}
