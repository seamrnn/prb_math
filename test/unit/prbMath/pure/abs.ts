import { BigNumber } from "@ethersproject/bignumber";
import { expect } from "chai";

import { MAX_WHOLE_59x18, MIN_59x18, MIN_WHOLE_59x18, PI, UNIT } from "../../../../helpers/constants";
import { bn, fp } from "../../../../helpers/numbers";

export default function shouldBehaveLikeAbs(): void {
  describe("when x is zero", function () {
    it("works", async function () {
      const x: number = 0;
      const result: BigNumber = await this.prbMath.doAbs(x);
      expect(result).to.equal(x);
    });
  });

  describe("when x is a negative number", function () {
    describe("when x = min 59x18", function () {
      it("reverts", async function () {
        const x: BigNumber = MIN_59x18;
        await expect(this.prbMath.doAbs(x)).to.be.reverted;
      });
    });

    describe("when x > min 59x18", function () {
      it("works when x = min 59x18 + 1", async function () {
        const x: BigNumber = MIN_59x18.add(1);
        const result: BigNumber = await this.prbMath.doAbs(x);
        expect(result).to.equal(x.mul(-1));
      });

      it("works when x = min whole 59x18", async function () {
        const x: BigNumber = MIN_WHOLE_59x18;
        const result: BigNumber = await this.prbMath.doAbs(x);
        expect(result).to.equal(x.mul(-1));
      });

      it("works when x = -1e18", async function () {
        const x: BigNumber = bn(-1e18).mul(UNIT);
        const result: BigNumber = await this.prbMath.doAbs(x);
        expect(result).to.equal(x.mul(-1));
      });

      it("works when x = -4.2", async function () {
        const x: BigNumber = fp(-4.2);
        const result: BigNumber = await this.prbMath.doAbs(x);
        expect(result).to.equal(x.mul(-1));
      });

      it("works when x = -pi", async function () {
        const x: BigNumber = PI.mul(-1);
        const result: BigNumber = await this.prbMath.doAbs(x);
        expect(result).to.equal(PI);
      });

      it("works when x = -1", async function () {
        const x: BigNumber = fp(-1);
        const result: BigNumber = await this.prbMath.doAbs(x);
        expect(result).to.equal(x.mul(-1));
      });

      it("works when x = -1.125", async function () {
        const x: BigNumber = fp(-1.125);
        const result: BigNumber = await this.prbMath.doAbs(x);
        expect(result).to.equal(x.mul(-1));
      });

      it("works when x = -2", async function () {
        const x: BigNumber = fp(-2);
        const result: BigNumber = await this.prbMath.doAbs(x);
        expect(result).to.equal(x.mul(-1));
      });

      it("works when x = -0.5", async function () {
        const x: BigNumber = fp(-0.5);
        const result: BigNumber = await this.prbMath.doAbs(x);
        expect(result).to.equal(x.mul(-1));
      });

      it("works when x = -0.1", async function () {
        const x: BigNumber = fp(-0.1);
        const result: BigNumber = await this.prbMath.doAbs(x);
        expect(result).to.equal(x.mul(-1));
      });
    });
  });

  describe("when x is a positive number", function () {
    it("works when x = 0.1", async function () {
      const x: BigNumber = fp(0.1);
      const result: BigNumber = await this.prbMath.doAbs(x);
      expect(result).to.equal(x);
    });

    it("works when x = 0.5", async function () {
      const x: BigNumber = fp(0.5);
      const result: BigNumber = await this.prbMath.doAbs(x);
      expect(result).to.equal(x);
    });

    it("works when x = 1", async function () {
      const x: BigNumber = fp(1);
      const result: BigNumber = await this.prbMath.doAbs(x);
      expect(result).to.equal(x);
    });

    it("works when x = 1.125", async function () {
      const x: BigNumber = fp(1.125);
      const result: BigNumber = await this.prbMath.doAbs(x);
      expect(result).to.equal(x);
    });

    it("works when x = 2", async function () {
      const x: BigNumber = fp(2);
      const result: BigNumber = await this.prbMath.doAbs(x);
      expect(result).to.equal(x);
    });

    it("works when x = pi", async function () {
      const x: BigNumber = PI;
      const result: BigNumber = await this.prbMath.doAbs(x);
      expect(result).to.equal(x);
    });

    it("works when x = 4.2", async function () {
      const x: BigNumber = fp(4.2);
      const result: BigNumber = await this.prbMath.doAbs(x);
      expect(result).to.equal(x);
    });

    it("works when x = 1e18", async function () {
      const x: BigNumber = bn(1e18).mul(UNIT);
      const result: BigNumber = await this.prbMath.doAbs(x);
      expect(result).to.equal(x);
    });

    it("works when x = max whole 59x18", async function () {
      const x: BigNumber = MAX_WHOLE_59x18;
      const result: BigNumber = await this.prbMath.doAbs(x);
      expect(result).to.equal(x);
    });
  });
}
