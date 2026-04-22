#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

PORT="${1:-4173}"
IP="$(hostname -I 2>/dev/null | awk '{print $1}')"

printf "\n✅ Preview iniciado\n"
printf "Abra no computador: http://localhost:%s/preview/\n" "$PORT"
if [ -n "$IP" ]; then
  printf "Abra no tablet (mesma rede Wi-Fi): http://%s:%s/preview/\n" "$IP" "$PORT"
else
  printf "Não consegui detectar IP local automaticamente.\n"
fi
printf "\nUse Ctrl+C para parar.\n\n"

python3 -m http.server "$PORT"
