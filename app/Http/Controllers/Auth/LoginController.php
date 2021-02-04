<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    public function show()
    {
        if(Auth::check())
            return redirect()->route('home');
        return react('login', 'Login');
    }

    public function username()
    {
        return 'name';
    }

    public function login(Request $request)
    {
        if(Auth::check())
            return ['ok' => true, 'info' => 'already authenticated'];

        if(!$request->isJson())
            return ['err' => 'Richiesta non JSON'];

        $credential = $request->only('name', 'password');
        $rules = ['name' => 'required|string', 'password' => 'required|string'];

        if(!validator()->make($credential, $rules)->passes())
            return ['err' => 'Richiesta non valida'];

        if ($this->attemptLogin($request))
            return ['ok' => true];

        return ['err' => 'Username o Password non corretti'];
    }

    public function logout(Request $request)
    {
        if(Auth::check()) {
            $this->guard()->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }
        return redirect()->route('login');
    }

}
