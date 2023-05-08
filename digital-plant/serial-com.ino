//Youtube video https://youtube.com/shorts/LZcn2-uCJZY?feature=share
#include <Arduino_JSON.h>

#define LED_1 9

#define PUSH_1 12
#define POT_1 A0

const int tolerance = 1;

int ledBrightness = 10;
int buttonReadValue = HIGH;
int lastButtonRead = buttonReadValue;

JSONVar serialOutput;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  pinMode(LED_1, OUTPUT);

  pinMode(PUSH_1,INPUT_PULLUP);
}

void loop() {

  if (Serial.available() > 0) {
    String jsonString = Serial.readStringUntil("\n");
    if (jsonString != '\n') {
      JSONVar serialInput = JSON.parse(jsonString);

      if (JSON.typeof(serialInput) == "undefined") {
        Serial.println("JSON parsing failed!");
      } else {
        ledBrightness = serialInput["led1"];
        analogWrite(LED_1, ledBrightness);
      }
    }
  }

  // int potReading = map(analogRead(POT_1),0,1023,0,100);

  // if(abs(((int) serialOutput["potPercent"]) - potReading) >= tolerance ){
  //   // serialOutput["potPercent"] = potReading;
  //   // Serial.println(serialOutput);
  // }

  buttonReadValue = digitalRead(PUSH_1);
  if(buttonReadValue != lastButtonRead){
    lastButtonRead = buttonReadValue;
    if(buttonReadValue == LOW){
      Serial.println("{ storm : true }");
    } else {
      Serial.println("{ storm : false }");
    }
  }
}