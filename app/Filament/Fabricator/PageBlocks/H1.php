<?php

namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class H1 extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('h1')
            ->schema([
                \Filament\Forms\Components\TextInput::make('content')
                    ->label('Heading 1')
                    ->required()
                    ->columnSpanFull()
                    ->maxLength(255)
                    ->placeholder('Enter H1 text'),
            ]);
    }

    public static function mutateData(array $data): array
    {
        return $data;
    }
}