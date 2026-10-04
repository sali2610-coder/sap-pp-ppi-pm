/** The impact filter's "no impact tag" bucket. Its own module, with no imports:
 *  the incidents list (a client component) imported it from incidents-data,
 *  and with it every build-time module that one reads (the TX_INTEL registry,
 *  the OIC objects), about 1.78 MB of script on /neo/incidents/ (review,
 *  2026-10-03). */
export const IMPACT_UNTAGGED = "__none";
