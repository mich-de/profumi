$url = "https://m.media-amazon.com/images/I/61b230WF+sL._AC_SX679_.jpg"
$dest = "d:\python\profumi\public\images\lattafa\nasheet.jpg"
Write-Host "Downloading Nasheet image..."
curl.exe -L -o $dest $url
if (Test-Path $dest) { Write-Host "Download successful." } else { Write-Host "Download failed." }
