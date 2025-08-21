<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\Page;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\FileUpload;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class Hero extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('hero')
            ->schema([
                TextInput::make('title')->label('Title')->required(),
                Textarea::make('subtitle')->label('Subtitle'),
                Textarea::make('cta_text')->label('Call to Action Text'),
                TextInput::make('cta_url')->label('Call to Action URL'),
                FileUpload::make('background_url')
                    ->acceptedFileTypes(['video/mp4', 'video/webm', 'image/*'])
                    ->label('Background Video/Image')
                    ->directory('/video')
                    ->visibility('public')
                    ->openable()
                    ->helperText('Upload a video or image for the background.')

            ]);
    }
    public static function mutateData(array $data): array
    {
        return $data;
    }

}
