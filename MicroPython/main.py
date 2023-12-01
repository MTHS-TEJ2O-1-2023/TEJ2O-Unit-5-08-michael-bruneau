""" 
Copyright (c) 2020 MTHS All rights reserved
Created by: Michael Bruneau
Created on: Nov 2023
This program drives car and stops before hitting wall
"""

import robotbit
import sonar

# setup
basic.show_icon(IconNames.HAPPY)

# loop forever
while True:
    if input.button_is_pressed(Button.A):
        while True:
            # checking distance
            distance = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.CENTIMETERS)
            basic.show_number(distance)
            basic.show_string("cm")

            # if distance if 11 or greater move stepper moters 10 cm forward
            if distance >= 11:
                robotbit.stp_car_move(10, 42)
                basic.pause(500)

                # if stepper motor is 10 cm or less than 10 cm turn stepper motors 10 cm backward & turn 90 deegres
            else:
                robotbit.stp_car_move(-10, 42)
                basic.pause(500)
                robotbit.stp_car_turn(90, 42, 125)
                basic.pause(500)
