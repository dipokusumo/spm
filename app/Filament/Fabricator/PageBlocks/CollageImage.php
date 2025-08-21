<?php

namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\FileUpload;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class CollageImage extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('collage-image')
            ->schema([
                Repeater::make('images')
                    ->label('Collage Images')
                    ->minItems(1)
                    ->maxItems(4)
                    ->columnSpanFull()
                    ->required()
                    ->schema([
                        FileUpload::make('image')
                            ->label('Image')
                            ->image()
                            ->required()
                            ->directory('uploads/collage-images')
                            ->visibility('public'),
                    ])
            ]);
    }

    public static function mutateData(array $data): array
    {
        // Flatten images so frontend just gets URLs
        if (!empty($data['images'])) {
            $data['images'] = array_map(fn($item) => $item['image'] ?? '', $data['images']);
        }
        return $data;
    }
}