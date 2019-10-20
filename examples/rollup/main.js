import regeneratorRuntime from '@babel/runtime/regenerator';
import { Client } from "@ideal-postcodes/core-browser";

const client = new Client({ api_key: "iddqd" });

window.addEventListener("load", async () => {
  const postcode = "ID1 1QD";
  const result = await client.lookupPostcode({ postcode });

  const output = document.getElementById("result");
  output.innerText = JSON.stringify(result, null, 2);
});
