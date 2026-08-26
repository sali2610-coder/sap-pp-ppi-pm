import { knowledgeData } from "@/components/neo-shell/learn/knowledge-data";
const t = knowledgeData().totals;
console.log(JSON.stringify(t, null, 1));
