
String out;
int but0, but2, but4;

void setup() {
  // put your setup code here, to run once:
   // pinMode(0, INPUT);
   //pinMode(ledPin, OUTPUT);
   Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:

  but0 = analogRead(A0);
  but2 = analogRead(A2);
  but4 = analogRead(A4);

  out = "{\"but\":[";
  out += String(but0);
  out += ",";
  out += String(but2);
  out += ",";
  out += String(but4);
  out += "]}";
  Serial.println(out);

/*  
  Serial.println();
  Serial.print("{ 'channel1':");
  Serial.print(butVal0);
  Serial.print(", 'channel2':");
  Serial.print(butVal2);
  Serial.print(", 'channel3':");
  Serial.print(butVal4);
  Serial.print("}");
*/
}
