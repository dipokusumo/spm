<?php
namespace App\Helpers;

use Filament\Forms\Components\{Section, TextInput, Hidden};
use Filament\Forms\Get;
use Filament\Forms\Set;
use Illuminate\Validation\Rules\Unique;
use Closure;
use Illuminate\Support\Str;



class FormSchemaHelper
{
    public static function getSlugAndSeoSchema(): array
    {
        return [
            Section::make('Page Info')
                ->schema([
                    TextInput::make('title')
                        ->label('Title')
                        ->afterStateUpdated(function (Get $get, Set $set, ?string $state) {
                            if (!$get('is_slug_changed_manually') && filled($state)) {
                                $set('slug', Str::slug($state));
                            }
                        })
                        ->debounce('500ms')
                        ->required(),

                    Hidden::make('is_slug_changed_manually')->default(false)->dehydrated(false),

                    TextInput::make('slug')
                        ->label('Slug')
                        ->afterStateUpdated(fn(Set $set) => $set('is_slug_changed_manually', true))
                        ->rule(function ($state) {
                            return function (string $attribute, $value, Closure $fail) use ($state) {
                                if ($state !== '/' && (Str::startsWith($value, '/') || Str::endsWith($value, '/'))) {
                                    $fail('Slug cannot start or end with a slash.');
                                }
                            };
                        })
                        ->unique(ignoreRecord: true)
                        ->required(),
                ]),
            Section::make('SEO Settings')
                ->schema([
                    TextInput::make('seo_title')->label('SEO Title'),
                    TextInput::make('seo_description')->label('Meta Description'),
                    \Filament\Forms\Components\SpatieMediaLibraryFileUpload::make('seo_image')
                        ->collection('seo_images')
                        ->label('SEO Image')
                        ->image(),
                ]),
        ];
    }
}

?>