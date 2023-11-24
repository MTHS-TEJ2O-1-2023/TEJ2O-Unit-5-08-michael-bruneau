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
    basic.showIcon(IconNames.Yes)
    while (input.buttonIsPressed(Button.B) == false) {
      distanceToObject = sonar.ping(
        DigitalPin.P1,
        DigitalPin.P2,
        PingUnit.Centimeters
      )
      basic.showString(distanceToObject.toString() + ('cm'))
      if (distanceToObject >= 11) {
        basic.showIcon(IconNames.Yes)
        robotbit.StpCarMove(10, 42)
        basic.pause(500)
      } else {
        robotbit.StpCarMove(-10, 42)
        basic.pause(500)
        robotbit.StpCarTurn(90, 42, 125)
        // distanceToObject = 20
        basic.pause(500)
      }
    }
  }
}
