import { BigNumber } from "@ethersproject/bignumber";
import { expect } from "chai";
import fp from "evm-fp";
import forEach from "mocha-each";

import { MAX_SD59x18, MAX_WHOLE_SD59x18, MIN_SD59x18, MIN_WHOLE_SD59x18, PI } from "../../../helpers/constants";
import { ceil } from "../../../helpers/math";
import { bn } from "../../../helpers/numbers";
import { PRBMathErrors } from "../../shared/errors";

export default function shouldBehaveLikeCeil(): void {
  context("when x is zero", function () {
    it("returns 0", async function () {
      const x: BigNumber = bn("0");
      const expected: BigNumber = bn("0");
      expect(expected).to.equal(await this.contracts.prbMathSd59x18.doCeil(x));
      expect(expected).to.equal(await this.contracts.prbMathSd59x18Typed.doCeil(x));
    });
  });

  context("when x is not zero", function () {
    context("when x is negative", function () {
      const testSets = [
        [MIN_SD59x18],
        [MIN_WHOLE_SD59x18],
        ["-1e18"],
        ["-4.2"],
        ["-" + PI],
        ["-2"],
        ["-1"],
        ["-1.125"],
        ["-0.5"],
        ["-0.1"],
      ];

      forEach(testSets).it("takes %e and returns the correct value", async function (x: string) {
        const expected: BigNumber = fp(ceil(x));
        expect(expected).to.equal(await this.contracts.prbMathSd59x18.doCeil(fp(x)));
        expect(expected).to.equal(await this.contracts.prbMathSd59x18Typed.doCeil(fp(x)));
      });
    });

    context("when x is positive", function () {
      context("when x > max whole sd59x18", function () {
        const testSets = [[fp(MAX_WHOLE_SD59x18).add(1)], [fp(MAX_SD59x18)]];

        forEach(testSets).it("takes %e and reverts", async function (x: BigNumber) {
          await expect(this.contracts.prbMathSd59x18.doCeil(x)).to.be.revertedWith(PRBMathErrors.CeilSd59x18Overflow);
          await expect(this.contracts.prbMathSd59x18Typed.doCeil(x)).to.be.revertedWith(
            PRBMathErrors.CeilSd59x18Overflow,
          );
        });
      });

      context("when x <= max whole sd59x18", function () {
        const testSets = [["0.1"], ["0.5"], ["1"], ["1.125"], ["2"], [PI], ["4.2"], ["1e18"], [MAX_WHOLE_SD59x18]];

        forEach(testSets).it("takes %e and returns the correct value", async function (x: string) {
          const expected: BigNumber = fp(ceil(x));
          expect(expected).to.equal(await this.contracts.prbMathSd59x18.doCeil(fp(x)));
          expect(expected).to.equal(await this.contracts.prbMathSd59x18Typed.doCeil(fp(x)));
        });
      });
    });
  });
}
