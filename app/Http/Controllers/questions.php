<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\questions as data;

class questions extends Controller
{
    public function __invoke(Request $request)
    {
        return response()->json(data::all());
    }
}
