<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Builder;
use Illuminate\Support\Facades\Storage;
use App\Filament\Fabricator\PageBlocks\Hero;
use App\Filament\Fabricator\PageBlocks\BusinessModel;
use App\Filament\Fabricator\PageBlocks\TargetMarket;
use App\Models\Homepage as ModelsHomepage;
use Filament\Notifications\Notification;

class Homepage extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-globe-alt';
    protected static string $view = 'filament.pages.homepage';
    public static ?string $navigationGroup = 'Pages';

    public array $data = [];
    public array $blocks = [];
    public string $seo_title = '';
    public string $seo_description = '';
    public $seo_image = null;

    public function mount(): void
    {

        $homepage = ModelsHomepage::firstOrCreate(['id' => 1]);
        $this->data = $homepage->blocks ?? [];
        $this->blocks = $homepage->blocks ?? [];
        $this->seo_title = $homepage->seo_title ?? '';
        $this->seo_description = $homepage->seo_description ?? '';
        $this->seo_image = $homepage->seo_image ? Storage::url($homepage->seo_image) : null;

        $this->form->fill([]);
    }

    protected function getFormSchema(): array
    {
        return [
            Grid::make()
                ->schema([
                    Grid::make()->schema([
                        Section::make('SEO Settings')
                            ->schema([
                                TextInput::make('seo_title')
                                    ->label('SEO Title'),

                                Textarea::make('seo_description')
                                    ->label('Meta Description'),

                                FileUpload::make('seo_image')
                                    ->directory('seo')
                                    ->image()
                                    ->label('OpenGraph Image'),
                            ]),
                    ]),
                    Grid::make()->schema([
                        Section::make('Page Blocks')
                            ->schema([
                                Builder::make('blocks')
                                    ->blocks([
                                        Hero::getBlockSchema(),
                                        BusinessModel::getBlockSchema(),
                                        TargetMarket::getBlockSchema(),
                                    ]),
                            ]),
                    ]),
                ]),
        ];
    }


    public function submit(): void
    {
        $state = $this->form->getState();

        $blocks = collect($state['blocks'])->map(function ($block) {
            if ($block['type'] === 'hero') {
                $data = $block['data'];
                $block['data'] = $data;
            }

            return $block;
        })->toArray();

        ModelsHomepage::updateOrCreate(
            ['id' => 1],
            [
                'seo_title' => $state['seo_title'],
                'seo_description' => $state['seo_description'],
                'seo_image' => $state['seo_image'] ? Storage::putFile('seo', $state['seo_image']) : null,
                'blocks' => $blocks,
            ]
        );

        Notification::make()
            ->title('Homepage updated successfully!')
            ->success()
            ->send();

        $this->dispatch('refresh');
    }
}
