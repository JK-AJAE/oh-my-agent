param(
  [switch]$SkipPush
)

$ErrorActionPreference = "Stop"

function Invoke-Git {
  git @args
  if ($LASTEXITCODE -ne 0) {
    throw "git $args failed"
  }
}

$dirty = git status --porcelain
if ($dirty) {
  Write-Error "Working tree is dirty. Commit or stash changes before syncing."
  exit 1
}

Invoke-Git remote set-url --push upstream DISABLED
Invoke-Git fetch upstream --prune
Invoke-Git fetch origin --prune

Invoke-Git checkout main
Invoke-Git merge --ff-only upstream/main
if (-not $SkipPush) {
  Invoke-Git push origin main
}

Invoke-Git checkout custom
Invoke-Git merge --no-edit main
if (-not $SkipPush) {
  Invoke-Git push origin custom
}

Write-Host "Sync complete: main tracks upstream, custom carries overlay."
