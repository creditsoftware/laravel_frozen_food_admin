<?php

function react($module, $title = null, $inject = null) {
    if(!$title) $title = ucfirst($module);
    $srv = env('WEBPACK_DEV_SERVER', null);
    $scripts = '';
    $ver = env('APP_VERSION');

    if($srv) {
        $scripts = "<script type='text/javascript' src='$srv/js/$module.js'></script>";
    }
    else {
        $srv = env('APP_URL');
        $scripts = "<script type='text/javascript' src='$srv/js/vendors.js?$ver'></script>
                    <script type='text/javascript' src='$srv/js/$module.js?$ver'></script>";
    }
    return view('react', ['title' => $title, 'scripts' => $scripts, 'inject' => $inject]);
}

function echo_random() {
    echo "4";
}
