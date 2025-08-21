@component('mail::message')
# Kontak Baru dari Website

Seseorang baru saja mengirim pesan.

---

@isset ($data['division'])
**Divisi:** {{ $data['division'] }}
@endisset

@isset ($data['service'])
**Layanan:** {{ $data['service'] }}
@endisset

@isset ($data['budget'])
**Budget:** {{ $data['budget'] }}
@endisset

**Nama:** {{ $data['name'] }}

**Email:** {{ $data['email'] }}

**Pesan:**  
{{ $data['message'] }}

---

@php
    $truncatedMessage = Str::limit($data['message'], 60);
    $subject = "Balasan untuk pesan '" . $truncatedMessage . "...'";
@endphp

@component('mail::button', ['url' => 'mailto:' . $data['email'] . '?subject=' . urlencode($subject)])
Balas Email
@endcomponent

Terima kasih,<br>
**Artee IT**
@endcomponent