# Citations — APA 7 / IEEE / Harvard

Pick the style the user asked for; default **APA 7**. Format with `scripts/cite.py` to keep
punctuation consistent. **Never invent** a DOI, page, author, or year — if a field is unknown, omit
it and tell the user what's missing.

## Table of contents
- [Quick comparison](#quick-comparison)
- [APA 7](#apa-7)
- [IEEE](#ieee)
- [Harvard](#harvard)
- [Reference record (JSON for cite.py)](#reference-record)

## Quick comparison

| Feature | APA 7 | IEEE | Harvard |
|---------|-------|------|---------|
| In-text | (Author, Year) | [1] | (Author Year) |
| In-text + page | (Author, Year, p. 12) | [1, p. 12] | (Author Year, p. 12) |
| List order | Alphabetical by author | Citation order (numbered) | Alphabetical by author |
| Authors (list) | Last, F. M. | F. M. Last | Last, F. M. |
| Title case | Sentence case | Title case (quoted) | Sentence case |
| Journal | *Italic*, **bold** volume | *Italic*, vol. x | *Italic*, volume x |

## APA 7

**In-text:** one author `(Heckman, 2013)`; two `(Cunha & Heckman, 2007)`; 3+ `(Smith et al., 2025)`.
Direct quote adds page: `(Smith et al., 2025, p. 14)`. Narrative: `Heckman (2013) argued…`.

**Journal article:**
`Author, A. A., & Author, B. B. (Year). Title of the article in sentence case. *Journal Name*, *Volume*(Issue), pages. https://doi.org/xx`

Example:
`Cunha, F., & Heckman, J. J. (2007). The technology of skill formation. *American Economic Review*, *97*(2), 31–47. https://doi.org/10.1257/aer.97.2.31`

**Book:** `Author, A. A. (Year). *Title of work in sentence case*. Publisher.`
**Chapter:** `Author, A. A. (Year). Chapter title. In E. Editor (Ed.), *Book title* (pp. xx–xx). Publisher.`
**Report/web:** `Organization. (Year). *Title*. Site/Publisher. URL`

## IEEE

**In-text:** bracketed number in citation order `[1]`, `[2]`; range `[1]–[3]`; with page `[1, p. 12]`.
Reuse the same number for repeat cites. The reference list is numbered in the order first cited.

**Journal article:**
`[n] A. A. Author and B. B. Author, "Title of article," *Journal Name*, vol. x, no. y, pp. aa–bb, Year, doi: xx.`

Example:
`[1] F. Cunha and J. J. Heckman, "The technology of skill formation," *American Economic Review*, vol. 97, no. 2, pp. 31–47, 2007, doi: 10.1257/aer.97.2.31.`

**Book:** `[n] A. A. Author, *Title of Book*, xth ed. City, Country: Publisher, Year.`
**Report/web:** `[n] Organization, "Title," Year. [Online]. Available: URL`

## Harvard

**In-text:** `(Cunha and Heckman 2007)`; 3+ `(Smith et al. 2025)`; page `(Smith et al. 2025, p. 14)`.

**Journal article:**
`Author, A.A. and Author, B.B. (Year) 'Title of article', *Journal Name*, volume(issue), pp. aa–bb.`

Example:
`Cunha, F. and Heckman, J.J. (2007) 'The technology of skill formation', *American Economic Review*, 97(2), pp. 31–47.`

**Book:** `Author, A.A. (Year) *Title of book*. City: Publisher.`
**Report/web:** `Organization (Year) *Title*. Available at: URL (Accessed: D Month Year).`

## Reference record

`scripts/cite.py` consumes a JSON array of records. Fields (omit unknowns):

```json
[
  {
    "type": "article",            // article | book | chapter | report | web
    "authors": [["Cunha","F."],["Heckman","J. J."]],
    "year": 2007,
    "title": "The technology of skill formation",
    "container": "American Economic Review",
    "volume": "97", "issue": "2", "pages": "31-47",
    "doi": "10.1257/aer.97.2.31", "url": null,
    "publisher": null, "edition": null, "editors": null,
    "accessed": null              // for web (Harvard)
  }
]
```

Run: `python3 scripts/cite.py refs.json --style apa7|ieee|harvard`. It prints the formatted list and,
for IEEE, numbers in input order; for APA/Harvard, sorts alphabetically by first author surname.
