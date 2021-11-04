void setup(){
  
Serial.begin(9600);

}
 
void loop(){

  Serial.println("What is your command?");

  while(Serial.available() == 0){
    // do nothing while it waits for something to appear.
  }

  int arm1 = Serial.parseInt();
  int arm2 = Serial.parseInt();
  int arm3 = Serial.parseInt();
  
  Serial.println("Please confirm values...");
  Serial.print("Arm 1: ");
  Serial.println(arm1);
  Serial.print("Arm 2: ");
  Serial.println(arm2);
  Serial.print("Arm 3: ");
  Serial.println(arm3);

  Serial.end();
  Serial.begin(9600);

  Serial.println("Are those values correct? YES/NO");

  while(Serial.available() == 0){
    // do nothing while it waits for something to appear.
  }
  
  String confirmation = Serial.readStringUntil('\n');

  if (confirmation == "YES"){
    Serial.println("yay");
  } else if (confirmation == "NO"){
    Serial.println("nay");
  } else {
    Serial.println("no input");
  }

  Serial.end();
  Serial.begin(9600); // Don't ask me why this needs to exist... without it, the program will somehow write a 0 into the input or something and fuck shit up.
                      // this is totally not an ideal solution because... it's goign to break the IO stream and can be problematic?
}
