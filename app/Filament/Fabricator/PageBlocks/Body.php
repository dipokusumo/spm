<?php

namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Field;
use Filament\Forms\Components\TextInput;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class Body extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('body')
            ->schema([

            ])

            ->extraAttributes([
                'data-block-type' => 'body',

                'data-block-icon' => 'heroicon-o-document-text',
                'data-block-order' => 100,
                'data-block-collapsible' => true,
                'data-block-collapsed' => false,
            ]);
    }

    public static function mutateData(array $data): array
    {
        return $data;
    }
}