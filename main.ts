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

// loop forever
while (true) {
  if (input.buttonIsPressed(Button.A) == true) {
    basic.showIcon(IconNames.Yes)

    // loop everthing
    while (true) {
      // check distance
      distanceToObject = sonar.ping(
        DigitalPin.P1,
        DigitalPin.P2,
        PingUnit.Centimeters
      )
      // show distance
      basic.showString(distanceToObject.toString() + ('cm'))

      // if ditance is greater or equal to 11 move car 10 cm
      if (distanceToObject >= 11) {
        robotbit.StpCarMove(10, 42)
        basic.pause(500)

        // if 10 cm or less move car 10 cm back and turn right
      } else {
        robotbit.StpCarMove(-10, 42)
        basic.pause(500)
        robotbit.StpCarTurn(90, 42, 125)
        basic.pause(500)
      }
    }
  }
}
