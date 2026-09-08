Add-Type -AssemblyName System.Drawing

$logoPath = (Resolve-Path "public/logo.png.png").Path
$bmp = [System.Drawing.Bitmap]::FromFile($logoPath)
$w = $bmp.Width
$h = $bmp.Height

$minX = $w
$maxX = 0
$minY = $h
$maxY = 0

$minX = 4920
$maxX = 6970
$minY = 50
$maxY = 2105

$cropW = $maxX - $minX
$cropH = $maxY - $minY

Write-Host "Emblem exact crop: X=$minX, Y=$minY, W=$cropW, H=$cropH"

$emblemBmp = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gEmblem = [System.Drawing.Graphics]::FromImage($emblemBmp)
$gEmblem.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gEmblem.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gEmblem.Clear([System.Drawing.Color]::Transparent)

$srcRect = New-Object System.Drawing.Rectangle($minX, $minY, $cropW, $cropH)
$destRect = New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)
$gEmblem.DrawImage($bmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$gEmblem.Dispose()

# Create 512x512 square transparent canvas
$size = 512
$targetBmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($targetBmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)

# Fit emblem inside 512x512 with 8% margin (430px)
$innerSize = 440
$scale = [Math]::Min($innerSize / $cropW, $innerSize / $cropH)
$drawW = [int]($cropW * $scale)
$drawH = [int]($cropH * $scale)
$drawX = [int](($size - $drawW) / 2)
$drawY = [int](($size - $drawH) / 2)

$drawDest = New-Object System.Drawing.Rectangle($drawX, $drawY, $drawW, $drawH)
$g.DrawImage($emblemBmp, $drawDest, 0, 0, $cropW, $cropH, [System.Drawing.GraphicsUnit]::Pixel)
$emblemBmp.Dispose()

# Save 512x512 PNG
$targetBmp.Save("public/icon-512.png", [System.Drawing.Imaging.ImageFormat]::Png)
$targetBmp.Save("src/app/icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Create 180x180 for apple-icon
$appleBmp = New-Object System.Drawing.Bitmap(180, 180, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gApple = [System.Drawing.Graphics]::FromImage($appleBmp)
$gApple.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gApple.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gApple.DrawImage($targetBmp, 0, 0, 180, 180)
$appleBmp.Save("src/app/apple-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$gApple.Dispose()
$appleBmp.Dispose()

# Create 32x32 for favicon.ico
$icoBmp = New-Object System.Drawing.Bitmap(32, 32, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gIco = [System.Drawing.Graphics]::FromImage($icoBmp)
$gIco.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gIco.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gIco.DrawImage($targetBmp, 0, 0, 32, 32)
$hIcon = $icoBmp.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$fileStream = [System.IO.File]::OpenWrite("src/app/favicon.ico")
$icon.Save($fileStream)
$fileStream.Close()

$fileStreamPub = [System.IO.File]::OpenWrite("public/favicon.ico")
$icon.Save($fileStreamPub)
$fileStreamPub.Close()

$gIco.Dispose()
$icoBmp.Dispose()
$g.Dispose()
$targetBmp.Dispose()
$bmp.Dispose()

Write-Host "Favicons generated successfully!"
