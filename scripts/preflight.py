#!/usr/bin/env python3
"""Checks that must pass before publishing the static site."""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LANGS = ("en", "es", "de", "zh")
BANNED_PATHS = (
    re.compile(r"(^|/)(borrador-|borradores/|.*\.draft\.md$|.*_borrador\.)", re.I),
    re.compile(r"(^|/)(_tmp_.*\.pdf$|_figs_tmp/)", re.I),
    re.compile(r"(^|/)(\.env(?:\.|$)|.*\.(?:pem|key|p12|pfx|crt|cer)$|id_(?:rsa|ed25519)$)", re.I),
)
SECRET_PATTERNS = (
    re.compile(r"AKIA[0-9A-Z]{16}"),
    re.compile(r"AIza[0-9A-Za-z_-]{35}"),
    re.compile(r"gh[pousr]_[A-Za-z0-9_]{20,}"),
    re.compile(r"github_pat_[A-Za-z0-9_]{20,}"),
    re.compile(r"sk-[A-Za-z0-9_-]{20,}"),
    re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
)
TEXT_SUFFIXES = {".html", ".js", ".css", ".md", ".txt", ".xml", ".toml", ".json", ".yml", ".yaml"}


def tracked_files() -> list[Path]:
    output = subprocess.check_output(["git", "ls-files"], cwd=ROOT, text=True)
    return [ROOT / name for name in output.splitlines()]


def fail(message: str, errors: list[str]) -> None:
    errors.append(message)


def main() -> int:
    errors: list[str] = []
    tracked = tracked_files()
    for file in tracked:
        relative = file.relative_to(ROOT).as_posix()
        if any(pattern.search(relative) for pattern in BANNED_PATHS):
            fail(f"archivo prohibido versionado: {relative}", errors)
        if file.suffix.lower() in TEXT_SUFFIXES and file.is_file():
            text = file.read_text(encoding="utf-8", errors="replace")
            if any(pattern.search(text) for pattern in SECRET_PATTERNS):
                fail(f"posible secreto en: {relative}", errors)

    pages = [*ROOT.glob("*.html"), *(ROOT / "blog").glob("*.html"), *(ROOT / "card").glob("*.html")]
    for page in pages:
        text = page.read_text(encoding="utf-8")
        opens = len(re.findall(r"<div\b", text))
        closes = len(re.findall(r"</div>", text))
        if opens != closes:
            fail(f"div desbalanceados en {page.relative_to(ROOT)}: {opens}/{closes}", errors)
        counts = [text.count(f"lang-{lang}") for lang in LANGS]
        if len(set(counts)) != 1:
            fail(f"idiomas desbalanceados en {page.relative_to(ROOT)}: {counts}", errors)

    if errors:
        print("Preflight falló:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1
    print(f"Preflight OK: {len(pages)} HTML, sin archivos prohibidos ni secretos detectables.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
