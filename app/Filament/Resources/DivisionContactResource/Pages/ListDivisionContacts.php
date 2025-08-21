<?php

namespace App\Filament\Resources\DivisionContactResource\Pages;

use App\Filament\Resources\DivisionContactResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListDivisionContacts extends ListRecords
{
    protected static string $resource = DivisionContactResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // Actions\CreateAction::make(),
        ];
    }
}
