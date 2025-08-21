<x-filament-panels::page>
    <x-filament::page>
        <form wire:submit.prevent="submit">
            {{ $this->form }}
            <x-filament::button type="submit">Save</x-filament::button>
        </form>
    </x-filament::page>
</x-filament-panels::page>
