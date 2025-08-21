@component('mail::message')
# Hello {{ $data['name'] }}

---

Thanks for reaching out to us! We’ve received your message
@isset($data['division'])
 to {{ $data['division'] }}
@endisset

@isset($data['service'])
For services: {{ $data['service'] }}
@endisset

@isset($data['budget'])
With {{ $data['budget'] }} budget
@endisset

Message:  
{{ $data['message'] }}

We'll get back to you soon.

---

Thanks,<br>
**Artee Team**
@endcomponent