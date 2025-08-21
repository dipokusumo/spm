<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DivisionResource\Pages;
use App\Filament\Resources\DivisionResource\RelationManagers;
use App\Filament\Resources\DivisionResource\RelationManagers\WorksRelationManager;
use App\Models\Division;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Z3d0X\FilamentFabricator\Forms\Components\PageBuilder;
use Z3d0X\FilamentFabricator\Facades\FilamentFabricator;
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Group;
use App\Helpers\FormSchemaHelper;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use App\Filament\Fabricator\PageBlocks\Hero;

class DivisionResource extends Resource
{
    protected static ?string $model = Division::class;
    public static ?string $navigationGroup = 'Organization';
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Grid::make(3)
                    ->columns(2)
                    ->schema([
                        Group::make()
                            ->columnSpan(1)
                            ->schema([
                                TextInput::make('name')
                                    ->label('Division Name')
                                    ->required()
                                    ->maxLength(255),

                                ColorPicker::make('color')
                                    ->label('Division Color')
                                    ->required()
                                    ->helperText('Choose a color for this division, it will be used in various places.'),

                                Section::make('Page Blocks')
                                    ->schema([
                                        Builder::make('blocks')
                                            ->blocks([
                                                Hero::getBlockSchema(),
                                                // Add more blocks...
                                            ]),
                                    ])
                            ]),

                        Group::make()
                            ->columnSpan(1)
                            ->schema([
                                Section::make('SEO & Page Settings')
                                    ->schema([
                                        ...FormSchemaHelper::getSlugAndSeoSchema(),
                                        TextArea::make('custom')
                                            ->name('Custom CSS')
                                            ->label('Custom CSS')
                                            ->afterStateHydrated(function ($component, $state) {
                                                if (blank($state)) {
                                                    $component->state(
                                                        <<<'TEXT'
hero_title: , 
hero_subtitle: , 
hero_backgroundcta: , 
hero_textcta: , 
ourworks_title: , 
ourworks_backgroundviewmore: , 
ourworks_textviewmore: , 
project_backgroundservice: , 
project_textservice: , 
project_backgroundbudget: , 
project_textbudget: , 
project_privacypolicy: , 
project_backgroundcta: , 
project_textcta: ,
navbar: 
TEXT
                                                    );
                                                }
                                            })


                                    ])
                                    ->collapsible(),
                            ]),
                    ]),
            ]);
    }


    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
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
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\WorksRelationManager::class,
            RelationManagers\DivisionContactRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDivisions::route('/'),
            'create' => Pages\CreateDivision::route('/create'),
            'edit' => Pages\EditDivision::route('/{record}/edit'),
        ];
    }
}
