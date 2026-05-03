$packages = @(
    "api-client", "auth", "types", "products", "stock", "purchases", "sales", "suppliers", "reports", "users"
)

foreach ($pkg in $packages) {
    $dir = "packages\$pkg"
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir | Out-Null
    }
    if (!(Test-Path "$dir\src")) {
        New-Item -ItemType Directory -Path "$dir\src" | Out-Null
    }

    $packageJson = @"
{
  "name": "@repo/$pkg",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "lint": "eslint . --max-warnings 0",
    "check-types": "tsc --noEmit"
  },
  "devDependencies": {
    "@repo/eslint-config": "*",
    "@repo/typescript-config": "*",
    "eslint": "^9.39.1",
    "typescript": "5.9.2"
  }
}
"@
    Set-Content -Path "$dir\package.json" -Value $packageJson -Encoding UTF8

    $tsconfigJson = @"
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
"@
    Set-Content -Path "$dir\tsconfig.json" -Value $tsconfigJson -Encoding UTF8

    $indexTs = @"
export const name = '@repo/$pkg';
"@
    Set-Content -Path "$dir\src\index.ts" -Value $indexTs -Encoding UTF8
}

Write-Host "Packages created."
