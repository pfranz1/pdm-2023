#youtube link:https://www.youtube.com/shorts/VKPWvHaeWs8
#include <Arduino_JSON.h>

#define VRX_PIN A0
#define VRY_PIN A1

#define PUSH_PIN 2

#define BUZZ_PIN 9

JSONVar serialOutput;

// Variables will change:
int ledState = HIGH;        // the current state of the output pin
int buttonState;            // the current reading from the input pin
int lastButtonState = LOW;  // the previous reading from the input pin

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 50;    // the debounce time; increase if the output flickers

unsigned long buzzUntil = 0;
const unsigned long buzzDurationMs = 100; 

const int deadZone = 100;
const int range = 1024;
const int midPoint = range  / 2;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600) ;

  pinMode(PUSH_PIN, INPUT_PULLUP);

  serialOutput["xChange"] = 0;
  serialOutput["yChange"] = 0;
  serialOutput["didTap"] = false;

}

int calcScalar(int analogReading){
  if(abs(analogReading - midPoint) < deadZone) return 0;
  if(analogReading > midPoint) return 1;
  else return -1;
}

void onBuzzRequest(){
  buzzUntil = buzzDurationMs + millis();
}

void loop() {
  // DO buzz if buzzing
  if(millis() < buzzUntil){
    analogWrite(BUZZ_PIN,800);    
  } else {
    analogWrite(BUZZ_PIN,0);
  }


  // Read push pin

  int reading = digitalRead(PUSH_PIN);

  if (reading != lastButtonState) {
    // reset the debouncing timer
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    // whatever the reading is at, it's been there for longer than the debounce
    // delay, so take it as the actual current state:

    // if the button state has changed:
    if (reading != buttonState) {
      buttonState = reading;

      // only toggle the LED if the new button state is HIGH
      if (buttonState == LOW) {
        serialOutput["didTap"] = true;
      }
    }
  }

  lastButtonState = reading;

  // Joystick
  int xVal = analogRead(VRX_PIN);
  int yVal = analogRead(VRY_PIN);

  int xScalar = calcScalar(xVal);
  int yScalar = calcScalar(yVal); 
  
  serialOutput["xChange"] = xScalar;
  serialOutput["yChange"] = yScalar;

  Serial.println(serialOutput);

  serialOutput["didTap"] = false;


  // Serial.print("x = ");
  // Serial.print(xScalar);
  // Serial.print(", y = ");
  // Serial.println(yScalar);
  // Serial.print("btn = ");
  // Serial.println(reading);

  // Read from serial
  if (Serial.available() > 0) {
    String jsonString = Serial.readStringUntil("\n");
    if (jsonString != '\n') {
      JSONVar serialInput = JSON.parse(jsonString);

      if (JSON.typeof(serialInput) == "undefined") {
        Serial.println("JSON parsing failed!");
      } else {
        // active = (bool) serialInput["active"];
        bool didSquish = (bool) serialInput["didSquish"];
        if(didSquish){
          onBuzzRequest();
        }        
      }
    }
  }
}
