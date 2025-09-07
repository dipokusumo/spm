<?php

namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class ProductService extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('product-service')
            ->label('Product & Service')
            ->schema([
                TextInput::make('title')
                    ->label('Title')
                    ->required(),

                TextInput::make('section_anchor')
                    ->label('Section Anchor')
                    ->helperText('This is used for the URL anchor link. Example: your-anchor'),

                Repeater::make('products_services')
                    ->label('Products & Services')
                    ->schema([
                        FileUpload::make('image')
                            ->label('Product Image')
                            ->required()
                            ->image()
                            ->directory('uploads/products_services')
                            ->visibility('public'),

                        TextInput::make('name')
                            ->label('Product Name')
                            ->required(),

                        FileUpload::make('logo')
                            ->label('Product Logo')
                            ->required()
                            ->image()
                            ->directory('uploads/products_services')
                            ->visibility('public'),

                        Repeater::make('specs')
                            ->label('Specifications')
                            ->schema([
                                TextInput::make('label')->required(),
                                TextInput::make('value')->required(),
                            ])
                            ->columns(2),

                        Repeater::make('services')
                            ->label('Services')
                            ->schema([
                                TextInput::make('title')->required(),
                                Textarea::make('description')->rows(2)->required(),
                                TextInput::make('color')
                                    ->label('Card Color (hex)')
                            ])
                            ->minItems(1)
                            ->maxItems(4),
                    ])
                    ->minItems(1)

            ]);
    }

    public static function mutateData(array $data): array
    {
        return $data;
    }
}
