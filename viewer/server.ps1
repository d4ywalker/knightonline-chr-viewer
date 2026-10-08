param(
    [int]$Port = 8085
)

$scriptDir = $PSScriptRoot
$baseRoot = if (Test-Path (Join-Path $scriptDir "viewer")) { $scriptDir } else { (Split-Path $scriptDir -Parent) }
$baseViewer = if (Test-Path (Join-Path $scriptDir "index.html")) { $scriptDir } else { Join-Path $baseRoot "viewer" }
$baseModels = if (Test-Path (Join-Path $baseRoot "ALCEROS CHR MODEL")) {
    Join-Path $baseRoot "ALCEROS CHR MODEL"
} elseif (Test-Path (Join-Path $baseRoot "Chr")) {
    $baseRoot
} else {
    'd:\CHAR EDITOR\ALCEROS CHR MODEL'
}

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "  Knight Online 3D Model Viewer Local Server" -ForegroundColor Green
    Write-Host "  URL: $prefix" -ForegroundColor Yellow
    Write-Host "  Viewer Path: $baseViewer" -ForegroundColor Gray
    Write-Host "  Models Path: $baseModels" -ForegroundColor Gray
    Write-Host "  Press Ctrl+C to stop server" -ForegroundColor Gray
    Write-Host "==========================================================" -ForegroundColor Cyan
} catch {
    Write-Host "Failed to start listener on port $Port : $_" -ForegroundColor Red
    exit 1
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".dxt"  = "application/octet-stream"
    ".n3chr" = "application/octet-stream"
    ".n3cpart" = "application/octet-stream"
    ".n3cskins" = "application/octet-stream"
    ".n3skin" = "application/octet-stream"
    ".n3pmesh" = "application/octet-stream"
    ".n3cplug" = "application/octet-stream"
    ".n3anim" = "application/octet-stream"
    ".n3joint" = "application/octet-stream"
    ".fxb" = "application/octet-stream"
    ".n3fxplug" = "application/octet-stream"
    ".n3fxpart" = "application/octet-stream"
    ".n3fxbundle" = "application/octet-stream"
    ".n3shape" = "application/octet-stream"
    ".obj"  = "text/plain"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath)
        if ($urlPath -eq '/' -or $urlPath -eq '') {
            $urlPath = '/index.html'
        }

        $filePath = ""
        if ($urlPath.StartsWith("/models/")) {
            $rel = $urlPath.Substring(8).Replace('/', '\')
            $baseFileName = [System.IO.Path]::GetFileName($rel)
            $c1 = Join-Path $baseModels $rel
            $c2 = Join-Path $baseRoot $rel
            $c3 = Join-Path (Join-Path $baseRoot "ALCEROS CHR MODEL") $rel
            $cChr = Join-Path (Join-Path $baseRoot "Chr") $rel
            $cChrSelect = Join-Path (Join-Path $baseRoot "ChrSelect") $rel
            $cByChrSelect = Join-Path (Join-Path $baseRoot "ChrSelect") $baseFileName
            $cItem = Join-Path (Join-Path $baseRoot "Item") $rel
            $cByItem = Join-Path (Join-Path $baseRoot "Item") $baseFileName
            $cByChr = Join-Path (Join-Path $baseRoot "Chr") $baseFileName
            $cFx = Join-Path (Join-Path $baseRoot "fx") $rel
            $cObject = Join-Path (Join-Path $baseRoot "Object") $rel
            $cByObject = Join-Path (Join-Path $baseRoot "Object") $baseFileName
            if (Test-Path $c1 -PathType Leaf) {
                $filePath = $c1
            } elseif (Test-Path $c2 -PathType Leaf) {
                $filePath = $c2
            } elseif (Test-Path $cChrSelect -PathType Leaf) {
                $filePath = $cChrSelect
            } elseif (Test-Path $cByChrSelect -PathType Leaf) {
                $filePath = $cByChrSelect
            } elseif (Test-Path $cObject -PathType Leaf) {
                $filePath = $cObject
            } elseif (Test-Path $cByObject -PathType Leaf) {
                $filePath = $cByObject
            } elseif (Test-Path $cChr -PathType Leaf) {
                $filePath = $cChr
            } elseif (Test-Path $cItem -PathType Leaf) {
                $filePath = $cItem
            } elseif (Test-Path $cByItem -PathType Leaf) {
                $filePath = $cByItem
            } elseif (Test-Path $cByChr -PathType Leaf) {
                $filePath = $cByChr
            } elseif (Test-Path $cFx -PathType Leaf) {
                $filePath = $cFx
            } elseif (Test-Path $c3 -PathType Leaf) {
                $filePath = $c3
            } else {
                $filePath = $c1
            }
        } else {
            $rel = $urlPath.TrimStart('/').Replace('/', '\')
            $baseFileName = [System.IO.Path]::GetFileName($rel)
            $c1 = Join-Path $baseViewer $rel
            $c2 = Join-Path $baseRoot $rel
            $cChrSelect = Join-Path (Join-Path $baseRoot "ChrSelect") $rel
            $cByChrSelect = Join-Path (Join-Path $baseRoot "ChrSelect") $baseFileName
            $cChr = Join-Path (Join-Path $baseRoot "Chr") $rel
            $cItem = Join-Path (Join-Path $baseRoot "Item") $rel
            $cByItem = Join-Path (Join-Path $baseRoot "Item") $baseFileName
            $cByChr = Join-Path (Join-Path $baseRoot "Chr") $baseFileName
            $cFx = Join-Path (Join-Path $baseRoot "fx") $rel
            $cObject = Join-Path (Join-Path $baseRoot "Object") $rel
            $cByObject = Join-Path (Join-Path $baseRoot "Object") $baseFileName
            if (Test-Path $c1 -PathType Leaf) {
                $filePath = $c1
            } elseif (Test-Path $c2 -PathType Leaf) {
                $filePath = $c2
            } elseif (Test-Path $cChrSelect -PathType Leaf) {
                $filePath = $cChrSelect
            } elseif (Test-Path $cByChrSelect -PathType Leaf) {
                $filePath = $cByChrSelect
            } elseif (Test-Path $cObject -PathType Leaf) {
                $filePath = $cObject
            } elseif (Test-Path $cByObject -PathType Leaf) {
                $filePath = $cByObject
            } elseif (Test-Path $cChr -PathType Leaf) {
                $filePath = $cChr
            } elseif (Test-Path $cItem -PathType Leaf) {
                $filePath = $cItem
            } elseif (Test-Path $cByItem -PathType Leaf) {
                $filePath = $cByItem
            } elseif (Test-Path $cByChr -PathType Leaf) {
                $filePath = $cByChr
            } elseif (Test-Path $cFx -PathType Leaf) {
                $filePath = $cFx
            } else {
                $filePath = $c1
            }
        }

        # CORS & No-Cache
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate")
        $response.AddHeader("Pragma", "no-cache")
        $response.AddHeader("Expires", "0")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.Close()
            continue
        }

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = "application/octet-stream"
            if ($mimeTypes.ContainsKey($ext)) {
                $mime = $mimeTypes[$ext]
            }
            $response.ContentType = $mime

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.StatusCode = 200
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.Close()
    } catch {
        # continue loop on client abort
    }
}
