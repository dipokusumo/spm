<?php

namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use FilamentTiptapEditor\TiptapEditor;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class Carousel extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('carousel')
            ->label('Carousel')
            ->schema([
                TiptapEditor::make('carousel_title')
                    ->label('Carousel Title')
                    ->required()
                    ->tools([
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'link',
                        'color',   // ✅ tombol warna
                        'highlight',   // ✅ background color
                        'undo',
                        'redo',
                    ]),

                TextInput::make('section_anchor')
                    ->label('Section Anchor')
                    ->helperText('This is used for the URL anchor link. Example: your-anchor'),

                Repeater::make('slides')
                    ->label('Slides')
                    ->schema([
                        FileUpload::make('background_url')
                            ->label('Background Image')
                            ->image()
                            ->directory('uploads/carousel')
                            ->visibility('public'),

                        TextInput::make('slide_title')
                            ->label('Slide Title')
                            ->required(),

                        Textarea::make('slide_description')
                            ->label('Slide Description')
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
