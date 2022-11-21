// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.13;

import { E, PI, PRBMathUD60x18__Exp2InputTooBig, UD60x18, ZERO, exp2 } from "src/UD60x18.sol";
import { UD60x18__BaseTest } from "../UD60x18BaseTest.t.sol";

contract UD60x18__Exp2Test is UD60x18__BaseTest {
    UD60x18 internal constant MAX_PERMITTED = UD60x18.wrap(192e18 - 1);

    function testExp2__Zero() external {
        UD60x18 x = ZERO;
        UD60x18 actual = exp2(x);
        UD60x18 expected = ud(1e18);
        assertEq(actual, expected);
    }

    modifier NotZero() {
        _;
    }

    function testCannotExp2__GreaterThanMaxPermitted() external NotZero {
        UD60x18 x = MAX_PERMITTED.add(ud(1));
        vm.expectRevert(abi.encodeWithSelector(PRBMathUD60x18__Exp2InputTooBig.selector, x));
        exp2(x);
    }

    modifier LessThanOrEqualToMaxPermitted() {
        _;
    }

    function exp2Sets() internal returns (Set[] memory) {
        delete sets;
        sets.push(set({ x: 0.000000000000000001e18, expected: 1e18 }));
        sets.push(set({ x: 1e3, expected: 1_000000000000000693 }));
        sets.push(set({ x: 0.3212e18, expected: 1_249369313012024883 }));
        sets.push(set({ x: 1e18, expected: 2e18 }));
        sets.push(set({ x: 2e18, expected: 4e18 }));
        sets.push(set({ x: E, expected: 6_580885991017920969 }));
        sets.push(set({ x: 3e18, expected: 8e18 }));
        sets.push(set({ x: PI, expected: 8_824977827076287621 }));
        sets.push(set({ x: 4e18, expected: 16e18 }));
        sets.push(set({ x: 11.89215e18, expected: 3800_964933301542754377 }));
        sets.push(set({ x: 16e18, expected: 65536e18 }));
        sets.push(set({ x: 20.82e18, expected: 1851162_354076939434682641 }));
        sets.push(set({ x: 33.333333e18, expected: 10822636909_120553492168423503 }));
        sets.push(set({ x: 64e18, expected: 18_446744073709551616e18 }));
        sets.push(set({ x: 71.002e18, expected: 2364458806372010440881_644926416580874919 }));
        sets.push(set({ x: 88.7494e18, expected: 520273250104929479163928177_984511174562086061 }));
        sets.push(set({ x: 95e18, expected: 39614081257_132168796771975168e18 }));
        sets.push(set({ x: 127e18, expected: 170141183460469231731_687303715884105728e18 }));
        sets.push(
            set({ x: 152.9065e18, expected: 10701459987152828635116598811554803403437267307_663014047009710338 })
        );
        sets.push(set({ x: MAX_PERMITTED, expected: 6277101735386680759401282518710514696272033118492751795945e18 }));
        return sets;
    }

    function testExp2() external parameterizedTest(exp2Sets()) NotZero LessThanOrEqualToMaxPermitted {
        UD60x18 actual = exp2(s.x);
        assertEq(actual, s.expected);
    }
}
