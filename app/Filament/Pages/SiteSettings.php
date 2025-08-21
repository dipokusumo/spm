<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Forms;
use App\Models\SiteSettings as SiteSettingsModel;
use Filament\Forms\Components\Actions\Action;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;

class SiteSettings extends Page implements Forms\Contracts\HasForms
{
    use Forms\Concerns\InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-cog';
    protected static ?string $title = 'Site Settings';
    protected static string $view = 'filament.pages.site-settings';
    protected static ?string $navigationGroup = 'Settings';
    protected static ?int $navigationSort = 100; // appears after Division


    public ?array $data = [];

    public function mount(): void
    {
        $settings = SiteSettingsModel::firstOrNew();
        $data = $settings->toArray();

        // Convert children inside navbar_links to navbar_dropdowns
        $dropdowns = [];
        if (!empty($data['navbar_links'])) {
            foreach ($data['navbar_links'] as $link) {
                if (!empty($link['children'])) {
                    foreach ($link['children'] as $child) {
                        $dropdowns[] = [
                            'parent_label' => $link['label'],
                            'label'        => $child['label'] ?? '',
                            'url'          => $child['url'] ?? '',
                        ];
                    }
                }
            }
        }

        $data['navbar_dropdowns'] = $dropdowns;

        $this->form->fill($data);
    }


    protected function getFormSchema(): array
    {
        return [
            Section::make('Navbar Settings')
                ->schema([
                    FileUpload::make('navbar_logo')
                        ->label('Navbar Logo')
                        ->image()
                        ->directory('logos')
                        ->disk('public')
                        ->preserveFilenames(),

                    // Main navigation links
                    Repeater::make('navbar_links')
                        ->label('Main Navigation Links')
                        ->schema([
                            TextInput::make('label')->required(),
                            TextInput::make('url')->nullable(),
                            Toggle::make('has_dropdown')
                                ->label('Has Dropdown')
                                ->default(false),
                        ])
                        ->default([])
                        ->reorderable()
                        ->columns(3)
                        ->collapsible(),

                    // Dropdown/sub links
                    Repeater::make('navbar_dropdowns')
                        ->label('Dropdown Links')
                        ->schema([
                            Select::make('parent_label')
                                ->label('Parent Link')
                                ->options(function (callable $get) {
                                    $links = $get('../../navbar_links') ?? [];
                                    $options = [];
                                    foreach ($links as $link) {
                                        if (isset($link['label'])) {
                                            $options[$link['label']] = $link['label'];
                                        }
                                    }
                                    return $options;
                                })
                                ->required()
                                ->reactive(),
                            TextInput::make('label')->required(),
                            TextInput::make('url')->required(),
                        ])
                        ->default([])
                        ->columns(3)
                        ->collapsible(),

                ]),

            Section::make('Footer Settings')
                ->schema([
                    Textarea::make('footer_description')->rows(3),

                    Repeater::make('footer_socials')
                        ->label('Social Links')
                        ->schema([
                            TextInput::make('label')->required(),
                            TextInput::make('url')->url()->required(),
                            TextInput::make('icon')->required()->placeholder('lucide-instagram'),
                        ])
                        ->default([])
                        ->columns(3),
                ]),
        ];
    }

    public function save(): void
    {
        $data = $this->form->getState();

        // Process the navigation structure
        $processedData = $this->processNavigationData($data);

        $settings = SiteSettingsModel::firstOrNew();
        $settings->fill($processedData);
        $settings->save();

        Notification::make()
            ->title('Settings saved successfully')
            ->success()
            ->send();
    }

    private function processNavigationData(array $data): array
    {
        // Combine main links with their dropdowns
        $mainLinks = $data['navbar_links'] ?? [];
        $dropdowns = $data['navbar_dropdowns'] ?? [];

        // Group dropdowns by parent
        $dropdownsByParent = [];
        foreach ($dropdowns as $dropdown) {
            $parent = $dropdown['parent_label'];
            if (!isset($dropdownsByParent[$parent])) {
                $dropdownsByParent[$parent] = [];
            }
            $dropdownsByParent[$parent][] = [
                'label' => $dropdown['label'],
                'url' => $dropdown['url'],
            ];
        }

        // Add children to main links
        foreach ($mainLinks as &$link) {
            if (isset($dropdownsByParent[$link['label']])) {
                $link['children'] = $dropdownsByParent[$link['label']];
            }
        }

        $data['navbar_links'] = $mainLinks;
        unset($data['navbar_dropdowns']); // Remove the separate dropdown data

        return $data;
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Save Changes')
                ->action('save')
                ->color('primary'),
        ];
    }

    protected function getFormStatePath(): string
    {
        return 'data';
    }
}
