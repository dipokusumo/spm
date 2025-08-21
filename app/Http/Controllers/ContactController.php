<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Mail\ContactAutoReply;
use App\Mail\NotifyAdminOfContact;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(StoreContactRequest $request)
    {
        Contact::create($request->validated());

        // Kirim auto-reply
        Mail::to($request->email)->send(new ContactAutoReply(['name' => $request->name, 'message' => $request->message]));

        // Kirim email ke email perusahaan dari email perusahaan
        Mail::to(config('mail.from.address'))->send(new NotifyAdminOfContact([
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
        ]));
    }
}
