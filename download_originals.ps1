$urls = @{
    "invictus_victory.jpg" = "https://www.rabanne.com/dw/image/v2/BDCR_PRD/on/demandware.static/-/Sites-paco-master-catalog/default/dw8399589d/images/hi-res/INV/65164673_01.jpg?sw=1000&sh=1000&sm=fit&q=85"
    "ysl_tuxedo.jpg" = "https://www.yslbeauty.com/dw/image/v2/AAKI_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw1887858c/Fragrance/LE%20VESTIAIRE%20DES%20PARFUMS/Tuxedo/WW-51373YSL_Tuxedo_125ml.jpg?sw=1000&sh=1000&sm=fit&q=85"
    "stronger_with_you.jpg" = "https://www.armanibeauty.com/dw/image/v2/BDCR_PRD/on/demandware.static/-/Sites-armanibeauty-master-catalog/default/dw856336e3/images/hi-res/stronger-with-you-eau-de-toilette.jpg?sw=1000&sh=1000&sm=fit&q=85"
    "ombre_leather.jpg" = "https://www.tomfordbeauty.com/dw/image/v2/AAKI_PRD/on/demandware.static/-/Sites-tomford-master-catalog/default/dw9074092b/Signature/Ombre-Leather/T6WL_OMBR%C3%89%20LEATHER%20EAU%20DE%20PARFUM%20100ML_1000x1250.jpg"
    "tuscan_leather.jpg" = "https://www.tomfordbeauty.com/dw/image/v2/AAKI_PRD/on/demandware.static/-/Sites-tomford-master-catalog/default/dwed9bd4e3/Private%20Blend/Tuscan-Leather/T12C_TUSCAN%20LEATHER%20EAU%20DE%20PARFUM%20100ML_1000x1250.jpg"
    "layton.jpg" = "https://parfums-de-marly.com/cdn/shop/files/layton-75ml-edition-royale.jpg?v=1700661603"
    "dior_homme_intense.jpg" = "https://www.dior.com/luxury/dmc/dior/beauty/products/Y0479201/01_Dior_Homme_Intense_Eau_de_Parfum_Intense_100ml.jpg"
    "creed_silver_mountain_water.jpg" = "https://creedboutique.com/cdn/shop/products/creedsilvermountain-100ml.jpg"
    "creed_green_irish_tweed.jpg" = "https://creedboutique.com/cdn/shop/products/creedgreenirishtweed-100ml.jpg"
    "creed_millesime_imperial.jpg" = "https://creedboutique.com/cdn/shop/products/creedmillesimeimperial-100ml.jpg"
    "bvlgari_tygar.jpg" = "https://media2.bulgari.com/is/image/bulgari/42170_001.jpg"
}

$destDir = "d:\python\profumi\public\images\originals"
if (!(Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir }

foreach ($name in $urls.Keys) {
    $url = $urls[$name]
    $output = Join-Path $destDir $name
    Write-Host "Downloading $name from $url..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $output -UserAgent "Mozilla/5.0"
        Write-Host "Success: $output"
    } catch {
        Write-Host "Failed to download $name : $_"
    }
}
