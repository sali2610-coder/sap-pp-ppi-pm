import { nodes } from "@/components/neo-shell/erd/model";
let pk = 0, fk = 0, both = 0;
for (const n of nodes().values()) {
  pk += n.pk.length; fk += n.fk.length;
  both += n.pk.filter((f) => n.fk.includes(f)).length;
}
console.log(JSON.stringify({ pkFields: pk, fkFields: fk, fieldsInBothRoles: both }));
