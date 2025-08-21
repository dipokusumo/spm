<?php

namespace App\Filament\Resources\DivisionResource\RelationManagers;

use App\Filament\Resources\DivisionContactResource;
use App\Models\DivisionContact;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class DivisionContactRelationManager extends RelationManager
{
    protected static string $relationship = 'divisioncontact';

    public static function getTitle(Model $ownerRecord, string $pageClass): string
    {
        return 'Contact';
    }

    public function form(Form $form): Form
    {
        return DivisionContactResource::form($form);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('service')
                    ->label('Service')
                    ->formatStateUsing(fn($state) => is_array($state) ? implode(', ', $state) : $state)
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('budget')
                    ->label('Budget')
                    ->searchable()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                // Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                // Tables\Actions\EditAction::make(),
                // Tables\Actions\DeleteAction::make(),
                Tables\Actions\ViewAction::make()
                    ->modalHeading(fn ($record) => " Detail Contact to {$record->division->name} from {$record->name}"),
            ])
            ->bulkActions([
                // Tables\Actions\BulkActionGroup::make([
                //     Tables\Actions\DeleteBulkAction::make(),
                // ]),
            ]);
    }
}
