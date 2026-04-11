#!/usr/bin/env python3
"""Regenerate snippets/al-compatibility-browse-nav.liquid and -list.liquid from the master markdown."""

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MD = ROOT / "memory" / "vehicle-compatibility-master-list.md"


def is_probably_make(s: str) -> bool:
    if not s or s.startswith("⚠️"):
        return False
    if s.startswith("Most "):
        return False
    if s.startswith("Head "):
        return False
    if s.startswith("Headunits"):
        return False
    if s.startswith("If your"):
        return False
    if s.startswith("BMW vehicles are"):
        return False
    if s.count("(") >= 3:
        return False
    return True


def slugify(name: str) -> str:
    if "Škoda" in name or name.strip().startswith("Skoda"):
        return "skoda"
    s = name.lower().replace("š", "s")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def nav_letter(name: str) -> str:
    c = name[0].upper()
    if c == "Š":
        return "S"
    if "A" <= c <= "Z":
        return c
    return "#"


_YEAR_PAREN = re.compile(r"\((?:early\s+)?(?:19|20)\d{2}[^)]*\)")


def format_note_callout_paragraph(para: str) -> str:
    """Strip warning emoji; drop redundant 'GM EV Notice' label; prefix with 'Note:'."""
    text = para.strip()
    text = re.sub(r"^⚠️\s*", "", text)
    text = re.sub(r"^⚠\ufe0f\s*", "", text)
    text = text.strip()
    text = re.sub(r"^GM EV Notice[:\s]+\s*", "", text, count=1, flags=re.I)
    text = text.strip()
    if not text.lower().startswith("note:"):
        text = f"Note: {text}"
    return (
        '<p class="al-compat-browse__note al-compat-browse__note--callout">'
        f"{html.escape(text)}</p>"
    )


def split_model_segments(text: str) -> list[str]:
    """Split a compact 'Model (years) Model2 (years)' line. Keeps trailing notes
    like '(Some 2024 trims…)' attached to the preceding model entry."""
    text = text.strip()
    if not text:
        return []
    breaks = [0]
    for m in re.finditer(r"\)\s+(?!\()", text):
        breaks.append(m.end())
    breaks.append(len(text))
    parts: list[str] = []
    for i in range(len(breaks) - 1):
        seg = text[breaks[i] : breaks[i + 1]].strip()
        if seg:
            parts.append(seg)
    return parts


def highlight_year_parens(s: str) -> str:
    """Wrap year-like parentheticals in a span for badge styling."""
    parts: list[str] = []
    last = 0
    for m in _YEAR_PAREN.finditer(s):
        parts.append(html.escape(s[last : m.start()]))
        parts.append(
            '<span class="al-compat-browse__years">' + html.escape(m.group(0)) + "</span>"
        )
        last = m.end()
    parts.append(html.escape(s[last:]))
    return "".join(parts)


_TRAILING_NOTE = re.compile(
    r"^(.+?\((?:early\s+)?(?:19|20)\d{2}[^)]*\))\s+(\([^)]+\))\s*$", re.DOTALL
)


def rich_model_segment_html(seg: str) -> str:
    """Model line + optional trailing parenthetical note (Ford / F-150 style)."""
    seg = seg.strip()
    m = _TRAILING_NOTE.match(seg)
    if m:
        main, tail = m.group(1).strip(), m.group(2).strip()
        if re.match(r"^\((?:Some|Including|If)\b", tail, re.I):
            return (
                highlight_year_parens(main)
                + '<span class="al-compat-browse__model-subnote">'
                + html.escape(" " + tail)
                + "</span>"
            )
    return highlight_year_parens(seg)


def format_models_paragraph_html(para: str) -> str:
    segments = split_model_segments(para)
    if not segments:
        return ""
    lis: list[str] = []
    for seg in segments:
        inner = rich_model_segment_html(seg)
        lis.append(
            '<li class="al-compat-browse__model-item">'
            f'<div class="al-compat-browse__model-text">{inner}</div></li>'
        )
    return (
        '<div class="al-compat-browse__models-wrap">'
        '<ul class="al-compat-browse__model-list" role="list">'
        + "".join(lis)
        + "</ul></div>"
    )


def main() -> None:
    text = MD.read_text(encoding="utf-8")
    idx = text.index("```\nSupported Vehicles")
    end = text.index("\n```\n\n---\n", idx)
    raw = text[idx + 4 : end]
    lines = raw.split("\n")

    makes: list[tuple[str, str]] = []
    i = 0
    m = re.match(r"Supported Vehicles Models List:\s*(.+)", lines[i].strip())
    if not m:
        raise SystemExit("Expected first line: Supported Vehicles Models List: …")
    current_make = m.group(1).strip()
    i = 1
    buf_parts: list[str] = []

    def flush() -> None:
        nonlocal current_make, buf_parts
        body = "\n\n".join(p.strip() for p in buf_parts if p.strip()).strip()
        if current_make:
            makes.append((current_make, body))
        buf_parts = []

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        if stripped == "":
            i += 1
            continue
        prev_blank = i == 0 or lines[i - 1].strip() == ""
        if prev_blank and is_probably_make(stripped) and buf_parts:
            flush()
            current_make = stripped
            i += 1
            continue
        buf_parts.append(stripped)
        i += 1
    flush()

    letter_first: dict[str, str] = {}
    for name, _ in makes:
        L = nav_letter(name)
        if L not in letter_first:
            letter_first[L] = slugify(name)

    nav_order = [chr(c) for c in range(ord("A"), ord("Z") + 1)]
    if "#" in letter_first:
        nav_order.append("#")

    gen_note = (
        "{%- comment -%} Auto-generated from memory/vehicle-compatibility-master-list.md "
        "— run scripts/generate-compatibility-browse-snippet.py {%- endcomment -%}\n"
    )

    nav_parts = [
        gen_note,
        '<div class="al-compat-browse__nav-wrap" data-al-compat-nav>',
        '<p class="al-compat-browse__nav-label" id="al-compat-browse-nav-label">Jump to make</p>',
        '<nav class="al-compat-browse__nav" aria-labelledby="al-compat-browse-nav-label">',
    ]
    for L in nav_order:
        if L not in letter_first:
            continue
        sid = letter_first[L]
        label = "Other" if L == "#" else L
        nav_parts.append(
            f'<a class="al-compat-browse__nav-link" href="#make-{sid}" data-letter="{html.escape(L)}">{html.escape(label)}</a>'
        )
    nav_parts.extend(["</nav>", "</div>"])
    (ROOT / "snippets" / "al-compatibility-browse-nav.liquid").write_text(
        "\n".join(nav_parts), encoding="utf-8"
    )

    list_parts = [gen_note, '<div class="al-compat-browse__list">']
    for name, body in makes:
        sid = slugify(name)
        blob = re.sub(r"\s+", " ", (name + " " + body).lower())[:2800]
        list_parts.append(
            f'<article class="al-compat-browse__make" id="make-{sid}" data-al-compat-make data-search-text="{html.escape(blob, quote=True)}">'
        )
        list_parts.append(f'<h2 class="al-compat-browse__make-title">{html.escape(name)}</h2>')
        for para in body.split("\n\n"):
            para = para.strip()
            if not para:
                continue
            if para.startswith("⚠"):
                list_parts.append(format_note_callout_paragraph(para))
            elif (
                "Most 2022" in para
                or para.startswith("Head ")
                or para.startswith("Headunits")
                or para.startswith("If your")
                or para.startswith("BMW vehicles")
            ):
                list_parts.append(f'<p class="al-compat-browse__note">{html.escape(para)}</p>')
            else:
                list_parts.append(format_models_paragraph_html(para))
        list_parts.append("</article>")
    list_parts.append("</div>")
    (ROOT / "snippets" / "al-compatibility-browse-list.liquid").write_text(
        "\n".join(list_parts), encoding="utf-8"
    )

    print(f"Wrote {len(makes)} makes to snippets.")


if __name__ == "__main__":
    main()
