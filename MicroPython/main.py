"""
Created by: Michael Bruneau 
Created on: Nov 2023
This module is a Micro:bit MicroPython program
"""

from microbit import *
from robotbit import *


class HCSR04:
    # this class abstracts out the functionality of the HC-SR04 and
    #   returns distance in mm
    # Trig: pin 1
    # Echo: pin 2
    def __init__(self, tpin=pin1, epin=pin2, spin=pin13):
        self.trigger_pin = tpin
        self.echo_pin = epin
        self.sclk_pin = spin

    def distance_mm(self):
        spi.init(
            baudrate=125000,
            sclk=self.sclk_pin,
            mosi=self.trigger_pin,
            miso=self.echo_pin,
        )
        pre = 0
        post = 0
        k = -1
        length = 500
        resp = bytearray(length)
        resp[0] = 0xFF
        spi.write_readinto(resp, resp)
        # find first non zero value
        try:
            i, value = next((ind, v) for ind, v in enumerate(resp) if v)
        except StopIteration:
            i = -1
        if i > 0:
            pre = bin(value).count("1")
            # find first non full high value afterwards
            try:
                k, value = next(
                    (ind, v)
                    for ind, v in enumerate(resp[i : length - 2])
                    if resp[i + ind + 1] == 0
                )
                post = bin(value).count("1") if k else 0
                k = k + i
            except StopIteration:
                i = -1
        dist = -1 if i < 0 else round(((pre + (k - i) * 8.0 + post) * 8 * 0.172) / 2)
        return dist


# variabels
sonar = HCSR04()

# setup
display.show(Image.HEART)

# checking distance from object
while True:
    if button_a.is_pressed():
        display.show(Image.YES)
        while True:
            distance = sonar.distance_mm() / 10
            display.show(distance)
            if distance >= 11:
                robotbit.stp_car_move(10, 42)
                sleep(500)
            else:
                robotbit.stp_car_move(-10, 42)
                sleep(500)
                robotbit.stp_car_turn(90, 42, 125)
                sleep(500)
