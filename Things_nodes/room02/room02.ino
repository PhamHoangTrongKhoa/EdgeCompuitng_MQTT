#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"
#include <BH1750.h>
#include <Wire.h>
#include "ReadButton.h"
BH1750 lightMeter;
#define SCL D1
#define SDA D2

const char* ssid = "Aa";
const char* password = "22222222";
//const char* ssid = "wifilap1";
//const char* password = "12345678";
const char* mqttServer = "192.168.137.200";
unsigned long b_time;
String clientId = ""; // WiFi.begin(ssid, password);
                      // clientId = WiFi.localIP().toString(); // auto get ipAddress of esp
const char* m_topic = "HOME01";

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[100];
//char msg2[50];
int value = 0;
boolean flagCallback = false;
String str;

int Gas_analog = A0;
const int button1 = D4;
const int button2 = D5;
const int DHTPIN = D3;
const int DHTYPE = DHT11;
DHT dht(DHTPIN, DHTYPE);

long lastReadBtn = 0;
long lastReadBtn2 = 0;
bool fbutton = false;
bool _fbutton = true;
int flagSend = 0;

bool fbutton2 = false;
bool _fbutton2 = true;
int flagSend2 = 0;

enum {INIT, ON, OFF} state;
enum {INIT2, ON2, OFF2} state2;  


void setup(){
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqttServer, 1883);
  client.setCallback(callback);

  // Initialize the I2C bus (BH1750 library doesn't do this automatically)
  Wire.begin(D2, D1);//SDA,SLC
  // On esp8266 you can select SCL and SDA pins using Wire.begin(D4, D3);
  lightMeter.begin();

  dht.begin();
  state = INIT;
  state2 = INIT2;
  pinMode(button1, INPUT);
  pinMode(button2, INPUT);
  pinMode(D6,OUTPUT);
  pinMode(D7,OUTPUT);
  pinMode(D8,OUTPUT);
}

void setup_wifi(){
  delay(10);
  Serial.println();
  Serial.print("Conecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println(" ");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  clientId = WiFi.localIP().toString();
}

void callback(char* topic, byte* payload, unsigned int length){
  flagCallback = true;
  Serial.print("Message read [");
  Serial.print(topic);
  Serial.print("]");
  for (int i = 0; i < length; i++){
//    Serial.print((char)payload[i]);
    str.concat((char)payload[i]);
  }
  Serial.println(str);
  
  xulidulieu(str);
  str = "";
//  delay(1000);
}

void xulidulieu(String str){
//  if(str == "server get stauts device"){
//    snprintf (msg, 50, "flag:2|room:01|led01:ON|led02:ON|led03:OFF");
//    client.publish(m_topic, msg);
//  }
  if (str.substring(0,7) == "room:02"){ //tu ki tu so 1 den 7
    str.replace("room:02|","");
    if (str.substring(0,8) == "Id:led01"){
      str.replace("Id:led01|","");
      if(str.substring(7,9) == "ON"){
        if(digitalRead(D6) == 0){
          digitalWrite(D6, HIGH);
          snprintf (msg, 50, "flag:2|room:02|name:02led01|status:ON");
          client.publish(m_topic, msg);
          state = ON;
        }
      }else if(str.substring(7,10) == "OFF"){
        if(digitalRead(D6) == 1){
          digitalWrite(D6, LOW);
          snprintf (msg, 50, "flag:2|room:02|name:02led01|status:OFF");
          client.publish(m_topic, msg);
          state = OFF;
        }       
      }
    }else if (str.substring(0,8) == "Id:led02"){
      str.replace("Id:led02|","");
      if(str.substring(7,9) == "ON"){
        if(digitalRead(D7) == 0){
          digitalWrite(D7, HIGH);
          snprintf (msg, 50, "flag:2|room:02|name:02led02|status:ON");
          client.publish(m_topic, msg);
          state2 = ON2;
        }
        
      }else if(str.substring(7,10) == "OFF"){
        if(digitalRead(D7) == 1){
          digitalWrite(D7, LOW);
          snprintf (msg, 50, "flag:2|room:02|name:02led02|status:OFF");
          client.publish(m_topic, msg);
          state2 = OFF2;
        }      
      }
    }

    if(str.substring(0, 15) == "warning from pi"){
    if(digitalRead(D8) == 0){
          digitalWrite(D8, HIGH);
          snprintf (msg, 50, "flag:2|room:01|name:01led03|status:ON");
          client.publish(m_topic, msg);
        }
    }
  }
}

void reconnect(){
  while (!client.connected()){
    Serial.print("Attempting MQTT connection...");
    if (client.connect(clientId.c_str())){
      Serial.println("connected");
      client.publish(m_topic, "Reconnect");
      client.subscribe(m_topic);
    }else{
      Serial.print("failed, rc= ");
      Serial.print(client.state());
      //wait for 1s
      delay(1000);
    }
  }
}

void loop(){
  if(!client.connected()){
    reconnect();
  }
  client.loop();

  // each second, send data to server
  long now = millis();
  if (now - lastMsg > 3000){
    lastMsg = now;
  
    float h = dht.readHumidity();
    float t = dht.readTemperature();
    int gassensorAnalog = analogRead(Gas_analog);
    float lux = lightMeter.readLightLevel();
    snprintf (msg, 100, "flag:1|room:02|nhiet:%f|am:%f|lux:%f|smoke:%d", t, h, lux, gassensorAnalog); 
    client.publish(m_topic, msg);
  }

 //doc nut nhan thu 2. mỗi 10ms đọc 1 lần
  if (now - lastReadBtn > 10){
    lastReadBtn = now;
    ReadButton1(fbutton, _fbutton);
  }
  switch(state){
    case INIT:
//      Serial.println("INIT" );
      if((_fbutton==true)&&(fbutton==true)){
        flagSend=1;
        if(digitalRead(D6) == 1){
          state = OFF;
          Serial.println("state OFF" );
        }
        else{
          state = ON;
          Serial.println("state ON" );
        }
        fbutton = false;
      }
      break;
    case ON:
      if(flagSend==1){
        digitalWrite(D6, HIGH);
        snprintf (msg, 50, "flag:2|room:02|name:02led01|status:ON");
        client.publish(m_topic, msg);
        Serial.println("turn on D6");
        flagSend=0;
      }
      if((_fbutton==true)&&(fbutton==true)){
        flagSend=1;
        state = OFF;
        Serial.println("OFF" );
        fbutton = false;
      }
      break;
     case OFF:
      if(flagSend==1){
        digitalWrite(D6, LOW);
        snprintf (msg, 50, "flag:2|room:02|name:02led01|status:OFF");
        client.publish(m_topic, msg);
        Serial.println("turn off D6");
        flagSend=0;
      }
      if((_fbutton==true)&&(fbutton==true)){
        flagSend=1;
        state = ON;
        Serial.println("ON" );
        fbutton = false;
      }
      break;
     default: 
      break;
  }

  //doc nut nhan thu 2. mỗi 10ms đọc 1 lần
  if (now - lastReadBtn2 > 10){
    lastReadBtn2 = now;
    ReadButton2(fbutton2, _fbutton2);
  }
  switch(state2){
    case INIT2:
//      Serial.println("INIT" );
      if((_fbutton2==true)&&(fbutton2==true)){
        flagSend2=1;
        if(digitalRead(D7) == 1){
          state2 = OFF2;
          Serial.println("state2 OFF" );
        }
        else{
          state2 = ON2;
          Serial.println("state2 ON" );
        }
        fbutton2 = false;
      }
      break;
    case ON2:
      if(flagSend2==1){
        digitalWrite(D7, HIGH);
        snprintf (msg, 50, "flag:2|room:02|name:02led02|status:ON");
        client.publish(m_topic, msg);
        Serial.println("turn on D7");
        flagSend2=0;
      }
      if((_fbutton2==true)&&(fbutton2==true)){
        flagSend2=1;
        state2 = OFF2;
        Serial.println("2 OFF" );
        fbutton2 = false;
      }
      break;
     case OFF2:
      if(flagSend2==1){
        digitalWrite(D7, LOW);
        snprintf (msg, 50, "flag:2|room:02|name:02led02|status:OFF");
        client.publish(m_topic, msg);
        Serial.println("turn off D7");
        flagSend2=0;
      }
      if((_fbutton2==true)&&(fbutton2==true)){
        flagSend2=1;
        state2 = ON2;
        Serial.println("2 ON" );
        fbutton2 = false;
      }
      break;
     default: 
      break;
  }
  
}
