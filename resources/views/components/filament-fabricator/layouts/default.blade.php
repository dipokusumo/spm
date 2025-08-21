@props(['page'])

@php
    session([
        'preview_data' => [
            'seo' => [
                'title' => $page['seo_title'] ?? '',
                'description' => $page['seo_description'] ?? '',
                'image' => $page['seo_image'] ?? null,
            ],
            'blocks' => is_string($page['blocks'] ?? null) ? json_decode($page['blocks'], true) : $page['blocks'] ?? [],
        ],
    ]);
@endphp

<script>
    window.location.href = "{{ route('page.preview', ['slug' => $page['slug'] ?? 'preview']) }}?preview=1";
</script>
