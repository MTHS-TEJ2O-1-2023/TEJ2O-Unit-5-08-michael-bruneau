/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Michael Bruneau
 * Created on: Nov 2023
 * This program drives car and stops before hitting wall
*/

// variables
let distanceToObject: number = 20

// setup
basic.showIcon(IconNames.Happy)

while (true) {
  if (input.buttonIsPressed(Button.A) == true) {
    while (distanceToObject >= 11) {
      basic.showIcon(IconNames.Yes)
      distanceToObject = sonar.ping(
        DigitalPin.P1,
        DigitalPin.P2,
        PingUnit.Centimeters
      )
      basic.showString(distanceToObject.toString() + ('cm'))
      robotbit.StpCarMove(10, 42)
    }
  robotbit.StpCarMove(-10, 42)
  robotbit.StpCarTurn(90, 48, 125)
  }
}
