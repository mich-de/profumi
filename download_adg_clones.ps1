$images = @{
    "armaf/blue_homme.jpg"                 = "https://fimgs.net/mdimg/perfume-thumbs/375x500.27686.jpg"
    "others/ajmal_shiro.jpg"               = "https://fimgs.net/mdimg/perfume-thumbs/375x500.51233.jpg"
    "others/franck_olivier_blue_touch.jpg" = "https://fimgs.net/mdimg/perfume-thumbs/375x500.18486.jpg"
    "others/perry_ellis_360_red.jpg"       = "https://fimgs.net/mdimg/perfume-thumbs/375x500.1906.jpg"
    "others/paris_hilton_just_me.jpg"      = "https://fimgs.net/mdimg/perfume-thumbs/375x500.1433.jpg"
}

$baseUrl = "d:\python\profumi\public\images"

foreach ($key in $images.Keys) {
    $url = $images[$key]
    $filepath = Join-Path $baseUrl $key
    $dir = Split-Path $filepath -Parent
    
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }

    Write-Host "Downloading $key from $url..."
    curl.exe -L -o $filepath $url
}
