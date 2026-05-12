import NodeCache from "node-cache";

// cache expires in 10 minutes (600 seconds)
const cache = new NodeCache({ stdTTL: 600 });
console.log("Cache initialized with TTL of 600 seconds");

export default cache;