<?php

namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\Radio;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;
use AmidEsfahani\FilamentTinyEditor\TinyEditor;

class SectionParagaph extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('section-paragraph')
            ->schema([
                Radio::make('content_type')
                    ->label('Content Type')
                    ->options([
                        'title' => 'Title',
                        'image' => 'Image',
                    ])
                    ->default('title')
                    ->inline()
                    ->required()
                    ->live(),

                TextInput::make('title')
                    ->label('Section Title')
                    ->maxLength(255)
                    ->columnSpanFull()
                    ->visible(fn ($get) => $get('content_type') === 'title')
                    ->required(fn ($get) => $get('content_type') === 'title'),

                ColorPicker::make('title_color')
                    ->label('Title Color')
                    ->default('#000000')
                    ->visible(fn ($get) => $get('content_type') === 'title'),
                
                TextInput::make('custom_css')
                    ->label('Custom CSS')
                    ->maxLength(255)
                    ->columnSpanFull()
                    ->visible(fn ($get) => $get('content_type') === 'title'),

                TextInput::make('url')
                    ->label('Section URL')
                    ->maxLength(255)
                    ->columnSpanFull()
                    ->visible(fn ($get) => $get('content_type') === 'title'),

                FileUpload::make('image')
                    ->label('Section Image')
                    ->image()
                    ->directory('uploads/section-paragraph')
                    ->visibility('public')
                    ->columnSpanFull()
                    ->visible(fn ($get) => $get('content_type') === 'image')
                    ->required(fn ($get) => $get('content_type') === 'image'),

                TinyEditor::make('content')
                    ->fileAttachmentsDisk('public')
                    ->fileAttachmentsVisibility('public')
                    ->fileAttachmentsDirectory('uploads')
                    ->profile('default')
                    ->columnSpan('full')
                    ->required(),

                Select::make('direction')
                    ->label('Text Direction')
                    ->options([
                        'ltr' => 'Left to Right',
                        'rtl' => 'Right to Left',
                    ])
                    ->default('ltr')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }

    public static function mutateData(array $data): array
    {
        // Bersihkan field yang tidak digunakan agar tidak tersimpan
        if ($data['content_type'] === 'title') {
            $data['image'] = null;
        } elseif ($data['content_type'] === 'image') {
            $data['title'] = null;
            $data['title_color'] = null;
        }

        return $data;
    }
}
