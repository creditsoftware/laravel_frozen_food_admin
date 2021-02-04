<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Variant
 *
 * @property int $id
 * @property int $product_id
 * @property string $name
 * @property string $description
 * @property string $allergens
 * @property string $energy
 * @property string $carbo
 * @property string $protein
 * @property string $fat
 * @property string $acidfat
 * @property string $sugar
 * @property string $salt
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereAcidfat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereAllergens($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereCarbo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereEnergy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereFat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereProtein($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereSalt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereSugar($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int $label_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereLabelId($value)
 * @property-read \App\Models\Format $label
 * @property-read \App\Models\Product $product
 * @property int $format_id
 * @property string|null $subtitle
 * @property-read \App\Models\Format $format
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereFormatId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereSubtitle($value)
 * @property string|null $note
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereNote($value)
 * @property string|null $notes
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereNotes($value)
 * @property string|null $image
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereImage($value)
 * @property string|null $ingredients
 * @property string|null $recipes
 * @property string|null $image1
 * @property string|null $image2
 * @property string|null $image3
 * @property string|null $image4
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereImage1($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereImage2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereImage3($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereImage4($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereIngredients($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereRecipes($value)
 * @property string|null $webdesc
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Label whereWebdesc($value)
 */
class Label extends Model
{
    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }

    protected $hidden = ['created_at'];
}
