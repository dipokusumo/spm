<?php

namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class BusinessModel extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('business-model')
            ->label('Business Model')
            ->schema([
                TextInput::make('title')
                    ->label('Title')
                    ->required(),

                Textarea::make('upper_paragraph')
                    ->label('Upper Paragraph')
                    ->rows(2),

                Textarea::make('lower_paragraph')
                    ->label('Lower Paragraph')
                    ->rows(3),

                Repeater::make('items')
                    ->label('Business Points')
                    ->schema([
                        TextInput::make('subtitle')
                            ->label('Subtitle')
                            ->required(),

                        Textarea::make('description')
                            ->label('Description')
                            ->rows(2)
                            ->required(),
                    ])
                    ->minItems(1)
                    ->grid(2),
            ]);
    }

    public static function mutateData(array $data): array
    {
        return $data;
    }
}
