//Youtube video https://youtube.com/shorts/LZcn2-uCJZY?feature=share
#include <Arduino_JSON.h>


#define LED_1 11
#define LED_2 10
#define LED_3 9

#define PUSH_1 12

#define POT_1 A0

bool active = true;

bool led1On = true;
bool led2On = true;
bool led3On = true;

const int tolerance = 1;

JSONVar serialOutput;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  pinMode(LED_1, OUTPUT);
  pinMode(LED_2, OUTPUT);
  pinMode(LED_3, OUTPUT);

  pinMode(PUSH_1,INPUT_PULLUP);
}

void loop() {

  // Serial.println("Hello?");
  // if(Serial.available() > 0){
  //   led1On = !led1On;
  //   Serial.read();
  // }

  if (Serial.available() > 0) {
    String jsonString = Serial.readStringUntil("\n");
    if (jsonString != '\n') {
      JSONVar serialInput = JSON.parse(jsonString);

      if (JSON.typeof(serialInput) == "undefined") {
        Serial.println("JSON parsing failed!");
      } else {
        // active = (bool) serialInput["active"];
        led1On = (bool) serialInput["led1"];
        led2On = (bool) serialInput["led2"];
        led3On = (bool) serialInput["led3"];
      }
    }
  }

  digitalWrite(LED_1, led1On ? HIGH : LOW);
  digitalWrite(LED_2, led2On ? HIGH : LOW);
  digitalWrite(LED_3, led3On ? HIGH : LOW);


  int potReading = map(analogRead(POT_1),0,1023,0,100);

  if(abs(((int) serialOutput["potPercent"]) - potReading) >= tolerance ){
    serialOutput["potPercent"] = potReading;
    Serial.println(serialOutput);
  }

}