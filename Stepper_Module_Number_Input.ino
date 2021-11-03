
#include <Stepper.h>
#include <math.h>
 
// Define Constants
 
// Number of steps per internal motor revolution 
const float STEPS_PER_REV = 32.0; 
 
//  Amount of Gear Reduction
const float GEAR_RED = 64.0;
 
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

float myNumber;

void setup(){
  
Serial.begin(9600);

}
 
void loop(){

  Serial.println("How many degrees?");

  while(Serial.available() == 0){
    // do nothing while it waits for something to appear.
  }
  
  myNumber = Serial.parseInt(); // parses an integer from the serial input. can be replaced with different function to look for commands etc later.r
  Serial.print("You chose: ");
  Serial.println(myNumber);

  // convert degrees into steps
  float StepsRequired = (myNumber/360.0)*STEPS_PER_OUT_REV;
  Serial.print("No. of steps: ");
  Serial.println(StepsRequired);

  steppermotor.setSpeed(700); // not sure if 700 is the fastest speed??? just use it because it seems to work.
  steppermotor.step(StepsRequired); 

  Serial.end();
  Serial.begin(9600); // Don't ask me why this needs to exist... without it, the program will somehow write a 0 into the input or something and fuck shit up.
                      // this is totally not an ideal solution because... it's goign to break the IO stream and can be problematic?
}
