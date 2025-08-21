<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDivisionContactRequest;
use App\Models\DivisionContact;
use App\Mail\ContactAutoReply;
use App\Mail\NotifyAdminOfContact;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

class DivisionContactController extends Controller
{
    public function store(StoreDivisionContactRequest $request)
    {
        $divisionContact = DivisionContact::create($request->validated());

        $divisionName = $divisionContact->division?->name ?? 'Unknown Division';

        // Kirim auto-reply
        Mail::to($request->email)->send(new ContactAutoReply(['division' => $divisionName, 'name' => $request->name, 'message' => $request->message, 'service' => implode(', ', $request->service), 'budget' => $request->budget]));

        // Kirim email ke email perusahaan dari email perusahaan
        Mail::to(config('mail.from.address'))->send(new NotifyAdminOfContact([
            'division' => $divisionName,
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
            'service' => implode(', ', $request->service),
            'budget' => $request->budget,
        ]));
    }
}
