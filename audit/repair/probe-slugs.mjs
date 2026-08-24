import { CENTER_FAMILIES } from "@/components/neo-shell/centers/centers-data";
for (const f of CENTER_FAMILIES.slice(0,3)) console.log(f.id, "->", f.items.slice(0,3).map(i=>i.slug).join(" "));
