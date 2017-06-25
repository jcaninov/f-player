#include <MFRC522.h>
#include <SPI.h>

String out;
int but0, but2, but4;

#define RST_PIN  9    //Pin 9 para el reset del RC522
#define SS_PIN  10   //Pin 10 para el SS (SDA) del RC522
MFRC522 mfrc522(SS_PIN, RST_PIN); //Creamos el objeto para el RC522

void setup() {
  Serial.begin(9600); //Iniciamos la comunicación  serial
  SPI.begin();        //Iniciamos el Bus SPI
  mfrc522.PCD_Init(); // Iniciamos  el MFRC522
  //Serial.println("Lectura del UID");
}

void loop() {
    readRfidCard();
    readPanel();
}

void readRfidCard(){
      // Revisamos si hay nuevas tarjetas  presentes
      if ( mfrc522.PICC_IsNewCardPresent()) 
      {  
        //Seleccionamos una tarjeta
        if ( mfrc522.PICC_ReadCardSerial()) 
        {
              // Enviamos serialemente su UID
              //Serial.print("Card UID:");
              out = "{\"rfid\":\"";
              for (byte i = 0; i < mfrc522.uid.size; i++) {
                      out += mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ";
                      out += mfrc522.uid.uidByte[i], HEX;   
              } 
              out += "\"}";
              Serial.println(out);
              // Terminamos la lectura de la tarjeta  actual
              mfrc522.PICC_HaltA();         
        }      
      } 
}

void readPanel() {
  // put your main code here, to run repeatedly:

  but0 = analogRead(A0);
  but2 = analogRead(A2);
  but4 = analogRead(A4);

  if (but0 > 0 && but2 > 0 && but4 >0)
  {
    out = "{\"but\":[";
    out += String(but0);
    out += ",";
    out += String(but2);
    out += ",";
    out += String(but4);
    out += "]}";
    Serial.println(out);
  }
}
