/*
  Stepper Motor Demonstration 1
  Stepper-Demo1.ino
  Demonstrates 28BYJ-48 Unipolar Stepper with ULN2003 Driver
  Uses Arduino Stepper Library
 
  DroneBot Workshop 2018
  https://dronebotworkshop.com
*/
 
//Include the Arduino Stepper Library
#include <Stepper.h>
 
// Define Constants
 
// Number of steps per internal motor revolution 
const float STEPS_PER_REV = 32; 
 
//  Amount of Gear Reduction
const float GEAR_RED = 64;
 
// Number of steps per geared output rotation
const float STEPS_PER_OUT_REV = STEPS_PER_REV * GEAR_RED;
 
// Define Variables
 
// Number of Steps Required
int StepsRequired;
 
// Create Instance of Stepper Class
// Specify Pins used for motor coils
// The pins used are 8,9,10,11 
// Connected to ULN2003 Motor Driver In1, In2, In3, In4 
// Pins entered in sequence 1-3-2-4 for proper step sequencing
 
Stepper steppermotor(STEPS_PER_REV, 8, 10, 9, 11);

int Value = 511;  // variable to store the value coming from the sensor
int Value1 = 511;
int TotalRotation = 0;
int direction = 0;
int speed = 0;
 
void setup()
{
pinMode(12, INPUT);
}
 
void loop()
{

  // read the value from the sensor:
  Value = analogRead(A0);
  Value1 = analogRead(A1);
  direction = 0;
  speed = 0;
  
  if(Value1 == 0){
    int stepsNeeded = -1*TotalRotation;
    speed = 700;
    steppermotor.setSpeed(speed);
    steppermotor.step(stepsNeeded);
    TotalRotation = 0;
  } else {
    if (Value > 520){
      direction = -1;
      speed = map(Value, 520, 1023, 1, 700);
    } else if (Value < 500){
      direction = 1;
      speed = map(Value, 500, 0, 1, 700);
    } else {
      speed = 0;
      direction = 0;
    }
  }

    steppermotor.setSpeed(speed);
    steppermotor.step(direction);
    
    if(direction == 1){
      TotalRotation++;
    } else if(direction == -1){
      TotalRotation--;
    }

//    Serial.print("Analogue Value: ");
//    Serial.print(Value);
//    Serial.print(" ");
//    Serial.print("|");
//    Serial.print(" ");
//    Serial.print("Speed/Direction: ");
//    Serial.print(speed);
//    Serial.print("/");
//    Serial.print(direction);
//    Serial.print(" ");
//    Serial.print("|");
//    Serial.print(" ");
//    Serial.print("Total Rotation: ");
//    Serial.print(TotalRotation);
//    Serial.print('\n');
}
