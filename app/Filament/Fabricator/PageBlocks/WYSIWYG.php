<?php

namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class WYSIWYG extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('Rich Text')
            ->schema([
                \Filament\Forms\Components\RichEditor::make('content')
                    ->label('Content')
                    ->required()
                    ->columnSpanFull()
                    ->toolbarButtons([
                        'attachFiles',
                        'blockquote',
                        'bold',
                        'bulletList',
                        'codeBlock',
                        'color', // Add this to enable font color selection
                        'h1',
                        'h2',
                        'h3',
                        'italic',
                        'link',
                        'orderedList',
                        'redo',
                        'strike',
                        'underline',
                        'undo',
                    ])
            ]);
    }

    public static function mutateData(array $data): array
    {
        return $data;
    }
}