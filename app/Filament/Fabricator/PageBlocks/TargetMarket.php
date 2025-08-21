<?php

namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class TargetMarket extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('target-market')
            ->label('Target Market')
            ->schema([
                TextInput::make('title')
                    ->label('Title')
                    ->required(),

                Repeater::make('items')
                    ->label('Target Industries & Customers')
                    ->schema([
                        TextInput::make('subtitle')
                            ->label('Industry / Customer')
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
