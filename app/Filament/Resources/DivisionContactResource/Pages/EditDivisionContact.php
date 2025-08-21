<?php

namespace App\Filament\Resources\DivisionContactResource\Pages;

use App\Filament\Resources\DivisionContactResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditDivisionContact extends EditRecord
{
    protected static string $resource = DivisionContactResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
