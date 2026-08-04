/**
 * Serialise a JSON-LD object for embedding inside a <script> tag.
 *
 * `JSON.stringify` alone is NOT safe in this position. It does not escape `<`,
 * so a value containing the literal `</script>` would close the tag early and
 * everything after it would be parsed as HTML — a script-injection sink. The
 * same applies to U+2028 / U+2029, which are valid inside JSON strings but are
 * line terminators in JavaScript and break the parse.
 *
 * Audited before adding this: across 10,162 emitted JSON-LD blocks in a full
 * build, zero currently contain `</script`, U+2028 or U+2029. So this is
 * defence in depth, not the repair of a live vulnerability — the datasets are
 * authored in-repo, not user-supplied. It exists so the guarantee still holds
 * if a future SAP note title, incident description or lesson body happens to
 * contain markup.
 *
 * Escaping `<` as `<` is transparent to consumers: it is the same
 * character to any JSON parser, including Google's structured-data parser.
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
