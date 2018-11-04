// test
#define STATE_ERROR -1
#define STATE_IDLE  0
#define STATE_FORE  1
#define STATE_BACK  2
#define STATE_LEFT  3
#define STATE_RIGHT 4

#define US_STATE_SEND 0
#define US_STATE_RECV 1

#define M_L_F 2
#define M_L_B 8

#define M_R_F 12
#define M_R_B 13

#define US_TRIGGER 7
#define US_ECHO    6
 
long duration = 0; 
long distance = 0;
int state = 0;
long randNumber;


void setup() {
  Serial.begin (9600); 
  pinMode(US_TRIGGER, OUTPUT); 
  pinMode(US_ECHO, INPUT); 
  
  pinMode(M_L_F, OUTPUT);
  pinMode(M_L_B, OUTPUT);
  pinMode(M_R_F, OUTPUT);
  pinMode(M_R_B, OUTPUT);
  
  randomSeed(analogRead(0));
}


struct SDelay {
  long previous;
  long interval;
};


void loop() {
    unsigned long currentMillis = millis();






  digitalWrite(US_TRIGGER, LOW); 
  delay(5); 
  digitalWrite(US_TRIGGER, HIGH); 
  delay(10);
  digitalWrite(US_TRIGGER, LOW);
  
  duration = pulseIn(US_ECHO, HIGH); 
  distance = (duration / 2) * 0.03432; 
    if (distance >= 500 || distance <= 0) {
      Serial.println("Kein Messwert");
      
    // set state foreward
    state = STATE_FORE;
  } else {
    Serial.print(distance); 
    Serial.println(" cm"); 
    
    // set state left or right
    randNumber = random(1);
    Serial.println(randNumber);
    
    if(randNumber > 0)
      state = STATE_LEFT;
    else
      state = STATE_RIGHT;
  }
  
  delay(100);
}
