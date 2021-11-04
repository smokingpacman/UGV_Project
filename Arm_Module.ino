
#include <Stepper.h>
#include <math.h>

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

float arm1_position = 0;
float arm2_position = 0; // keeps track of the number of steps away from original position the arm was in.
                       // zero is the position at initialisation, if the robot initialises
                       // in a different position, it will set that as "home"

void setup(){

  Serial.println("Initializing...");
  Serial.println("Starting serial connection");
  Serial.begin(9600);


}

void loop(){
  
  Serial.println("What is your command?");

  while(Serial.available() == 0){
    // do nothing while it waits for something to appear.
  }

  float arm1_input = Serial.parseFloat();
  float arm2_input = Serial.parseFloat();

  Serial.end();
  Serial.begin(9600);

  Serial.println("Please confirm values...");
  Serial.print("Arm 1: ");
  Serial.println(arm1_input);
  Serial.print("Arm 2: ");
  Serial.println(arm2_input);

  Serial.end();
  Serial.begin(9600);

  Serial.println("Are those values correct? YES/NO");

  while(Serial.available() == 0){
    // do nothing while it waits for something to appear.
  }
  
  String confirmation = Serial.readStringUntil('\n');

  if (confirmation == "YES"){
    float arm1_stepsRequired = (arm1_input/360.0)*STEPS_PER_OUT_REV;
    float arm2_stepsRequired = (arm2_input/360.0)*STEPS_PER_OUT_REV;
    
    Serial.print("Stepping arm 1 by ");
    Serial.println(arm1_stepsRequired);
    arm1.setSpeed(700); // not sure if 700 is the fastest speed??? just use it because it seems to work.
    arm1.step(arm1_stepsRequired);
    Serial.println("Complete");
    
    Serial.print("Stepping arm 2 by ");
    Serial.println(arm2_stepsRequired);
    arm2.setSpeed(700); // not sure if 700 is the fastest speed??? just use it because it seems to work.
    arm2.step(arm2_stepsRequired);
    Serial.println("Complete");

    arm1_position = arm1_position + arm1_stepsRequired;
    arm2_position = arm2_position + arm2_stepsRequired;

    Serial.println("Success");
    
  } else if (confirmation == "NO"){

    Serial.println("Aborting process...");
    
  } else {
    Serial.println("Invalid input");
  }

  Serial.println("Status report:");
  Serial.print("Arm 1 position: ");
  Serial.print(arm1_position);
  Serial.println("steps");
  Serial.print("Arm 2 position: ");
  Serial.print(arm2_position);
  Serial.println("steps");
  
  Serial.end();
  Serial.begin(9600); // Don't ask me why this needs to exist... without it, the program will somehow write a 0 into the input or something and fuck shit up.
                      // this is totally not an ideal solution because... it's goign to break the IO stream and can be problematic?
}
