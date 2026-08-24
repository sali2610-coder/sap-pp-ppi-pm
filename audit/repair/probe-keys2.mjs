import { nodes } from "@/components/neo-shell/erd/model";
import { mergedFields } from "@/components/neo-shell/erd/model";
/* Both bases, computed the same way, so BEFORE and AFTER are comparable:
   node-level PK/FK arrays under the OLD exact-match rule and the NEW includes rule. */
let oldPk = 0, oldFk = 0, newPk = 0, newFk = 0, dual = 0;
for (const n of nodes().values()) {
  const f = mergedFields(n.n);
  oldPk += f.filter((x) => x.key === "PK").length;
  oldFk += f.filter((x) => x.key === "FK").length;
  const np = f.filter((x) => /\bPK\b/i.test(x.key));
  const nf = f.filter((x) => /\bFK\b/i.test(x.key));
  newPk += np.length; newFk += nf.length;
  dual += np.filter((x) => /\bFK\b/i.test(x.key)).length;
}
console.log(JSON.stringify({ oldRule: { pk: oldPk, fk: oldFk, dual: 0 }, newRule: { pk: newPk, fk: newFk, dual } }));
