// The five routes of the Editorial Technology pilot (DESIGN-SPEC-EDITORIAL.md). A plain module, with no
// "use client", so the /neo layout's pre-paint script and the shell read the
// same list (a client module hands a server component a reference, not the
// value; lib/theme-boot.ts).
export const PILOT_ROUTES = /^\/neo\/(pm\/|tables\/|erd\/|read\/book9\/)?$/;
