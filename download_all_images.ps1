$images = @{
    # Lattafa / Maison Alhambra
    "public\images\lattafa\kismet_angel.jpg"                  = "https://fimgs.net/images/perfume/o.79015.jpg"
    "public\images\lattafa\nasheet.jpg"                       = "https://fimgs.net/images/perfume/o.81261.jpg"
    "public\images\lattafa\al_qiam_silver.jpg"                = "https://fimgs.net/images/perfume/o.80252.jpg"
    "public\images\lattafa\salvo.jpg"                         = "https://fimgs.net/images/perfume/o.82404.jpg"
    "public\images\lattafa\salvo_elixir.jpg"                  = "https://fimgs.net/images/perfume/o.94166.jpg"
    "public\images\lattafa\yeah.jpg"                          = "https://fimgs.net/images/perfume/o.83061.jpg"
    "public\images\lattafa\victorioso.jpg"                    = "https://fimgs.net/images/perfume/o.92617.jpg"
    "public\images\lattafa\victorioso_victory.jpg"            = "https://fimgs.net/images/perfume/o.93654.jpg"
    "public\images\lattafa\the_tux.jpg"                       = "https://fimgs.net/images/perfume/o.78559.jpg"
    "public\images\lattafa\your_touch.jpg"                    = "https://fimgs.net/images/perfume/o.93816.jpg"
    "public\images\lattafa\tobacco_touch.jpg"                 = "https://fimgs.net/images/perfume/o.79943.jpg"
    "public\images\lattafa\amber_leather.jpg"                 = "https://fimgs.net/images/perfume/o.93661.jpg"
    "public\images\lattafa\toscano_leather.jpg"               = "https://fimgs.net/images/perfume/o.79942.jpg"
    "public\images\lattafa\leyden.jpg"                        = "https://fimgs.net/images/perfume/o.98265.jpg"
    "public\images\lattafa\dark_door_intense.jpg"             = "https://fimgs.net/images/perfume/o.94172.jpg"

    # Armaf
    "public\images\armaf\cdnim.jpg"                           = "https://fimgs.net/images/perfume/o.34696.jpg"
    "public\images\armaf\cdnsillage.jpg"                      = "https://fimgs.net/images/perfume/o.64105.jpg"
    "public\images\armaf\tres_nuit.jpg"                       = "https://fimgs.net/images/perfume/o.27711.jpg"
    "public\images\armaf\cdn_milestone.jpg"                   = "https://fimgs.net/images/perfume/o.64104.jpg"

    # Others
    "public\images\others\detour_noir.jpg"                    = "https://fimgs.net/images/perfume/o.51141.jpg"
    "public\images\others\9pm.jpg"                            = "https://fimgs.net/images/perfume/o.63332.jpg"
    "public\images\others\la_yuqawam.jpg"                     = "https://fimgs.net/images/perfume/o.19668.jpg"

    # Originals (Missing ones)
    "public\images\originals\invictus_victory.jpg"            = "https://fimgs.net/images/perfume/o.65177.jpg"
    "public\images\originals\ysl_tuxedo.jpg"                  = "https://fimgs.net/images/perfume/o.32269.jpg"
    "public\images\originals\stronger_with_you.jpg"           = "https://fimgs.net/images/perfume/o.45258.jpg"
    "public\images\originals\ombre_leather.jpg"               = "https://fimgs.net/images/perfume/o.50239.jpg"
    "public\images\originals\tuscan_leather.jpg"              = "https://fimgs.net/images/perfume/o.1849.jpg"
    "public\images\originals\layton.jpg"                      = "https://fimgs.net/images/perfume/o.39314.jpg"
    "public\images\originals\dior_homme_intense.jpg"          = "https://fimgs.net/images/perfume/o.13016.jpg"
    "public\images\originals\creed_silver_mountain_water.jpg" = "https://fimgs.net/images/perfume/o.472.jpg"
    "public\images\originals\creed_green_irish_tweed.jpg"     = "https://fimgs.net/images/perfume/o.474.jpg"
    "public\images\originals\creed_millesime_imperial.jpg"    = "https://fimgs.net/images/perfume/o.466.jpg"
    "public\images\originals\bvlgari_tygar.jpg"               = "https://fimgs.net/images/perfume/o.41222.jpg"
}

$baseDir = "d:\python\profumi"

foreach ($path in $images.Keys) {
    $url = $images[$path]
    $fullPath = Join-Path $baseDir $path
    $directory = Split-Path $fullPath
    
    if (!(Test-Path $directory)) { New-Item -ItemType Directory -Path $directory -Force | Out-Null }
    
    Write-Host "Downloading $path..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $fullPath -UserAgent "Mozilla/5.0"
        Write-Host "Success."
    }
    catch {
        Write-Host "Failed to download $path : $_"
    }
}
