
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
 
Stepper arm1(STEPS_PER_REV, 30, 32, 31, 33);
Stepper arm2(STEPS_PER_REV, 34, 36, 35, 37);

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

  arm1.setSpeed(700); // not sure if 700 is the fastest speed??? just use it because it seems to work.
  arm1.step(StepsRequired); 
  arm2.setSpeed(700); // not sure if 700 is the fastest speed??? just use it because it seems to work.
  arm2.step(StepsRequired); 

  Serial.end();
  Serial.begin(9600); // Don't ask me why this needs to exist... without it, the program will somehow write a 0 into the input or something and fuck shit up.
                      // this is totally not an ideal solution because... it's goign to break the IO stream and can be problematic?
}
