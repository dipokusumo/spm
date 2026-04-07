<?php

namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\FileUpload;

use Filament\Forms\Components\TextInput;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class ImageMarquee extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('image-marquee')
            ->schema([
                TextInput::make('title')
                    ->label('Title')
                    ->required(),
                TextInput::make('section_anchor')
                    ->label('Section Anchor')
                    ->helperText('This is used for the URL anchor link. Example: your-anchor'),
                Repeater::make('images')
                    ->label('Images')
                    ->minItems(1)
                    ->maxItems(10)
                    ->columnSpanFull()
                    ->schema([
                        FileUpload::make('image')
                            ->label('Image')
                            ->image()
                            ->required()
                            ->directory('uploads/marquee')
                            ->visibility('public'),
                    ]),
                TextInput::make('speed')
                    ->label('Scroll Speed (seconds)')
                    ->numeric()
                    ->minValue(20)
                    ->default(20)
                    ->required()
                    ->columnSpanFull(),
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
