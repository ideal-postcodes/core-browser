import { assert } from "chai";
//TODO change import
import { Agent, Client } from "../lib/index";

//TODO check tests
describe("Module exports", () => {
  it("exports Agent", () => {
    assert.isDefined(Agent);
  });
  it("exports Client", () => {
    assert.isDefined(Client);
  });
});
