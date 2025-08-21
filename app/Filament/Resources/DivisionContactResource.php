<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DivisionContactResource\Pages;
use App\Filament\Resources\DivisionContactResource\RelationManagers;
use App\Models\DivisionContact;
use Filament\Forms;
use Filament\Forms\Components\Group;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class DivisionContactResource extends Resource
{
    protected static ?string $model = DivisionContact::class;

    public static ?string $navigationGroup = 'Organization';

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function shouldRegisterNavigation(): bool
    {
        return false; // hide from sidebar
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Grid::make(2)
                    ->schema([

                        Forms\Components\TextInput::make('name')
                            ->label('Name')
                            ->disabled(),
                        Forms\Components\Placeholder::make('service')
                            ->label('Service')
                            ->content(fn($record) => implode(', ', $record->service ?? [])),
                        Forms\Components\TextInput::make('email')
                            ->label('Email')
                            ->disabled(),
                        Forms\Components\TextInput::make('budget')
                            ->label('Budget')
                            ->disabled(),
                    ]),

                Forms\Components\Textarea::make('message')
                    ->label('Message')
                    ->disabled()
                    ->rows(5),

                Forms\Components\Checkbox::make('agreed')
                    ->label('Agree to the privacy policy')
                    ->disabled(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('division.name')
                    ->label('Division Name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Created At')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Updated At')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                // Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                // Tables\Actions\BulkActionGroup::make([
                //     Tables\Actions\DeleteBulkAction::make(),
                // ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDivisionContacts::route('/'),
            // 'create' => Pages\CreateDivisionContact::route('/create'),
            // 'edit' => Pages\EditDivisionContact::route('/{record}/edit'),
        ];
    }
}
