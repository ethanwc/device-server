import RPi.GPIO as GPIO     # Importing RPi library to use the GPIO pins
from time import sleep  # Importing sleep from time library
import random
import sys
green_led_pin = 21            # Initializing the GPIO pin 21 for LED
red_led_pin = 20
blue_led_pin = 16
GPIO.setmode(GPIO.BCM)          # We are using the BCM pin numbering
GPIO.setup(green_led_pin, GPIO.OUT)   # Declaring pin 21 as output pin
GPIO.setup(red_led_pin, GPIO.OUT)
GPIO.setup(blue_led_pin, GPIO.OUT)
pwm_green = GPIO.PWM(green_led_pin, 100)    # Created a PWM object
pwm_green.start(0)                    # Started PWM at 0% duty cycle
pwn_red = GPIO.PWM(red_led_pin, 100)
pwn_red.start(50)
pwm_blue = GPIO.PWM(blue_led_pin, 100)
pwm_blue.start(50)

r=float(sys.argv[1])
g=float(sys.argv[2])
b=float(sys.argv[3])

pwn_red.ChangeDutyCycle(r)
pwm_green.ChangeDutyCycle(g)
pwm_blue.ChangeDutyCycle(b)
sleep(1)