#include "ReadButton.h"
#include "Arduino.h"
#include <stdbool.h>

const int button1 = D4;
const int button2 = D5;

void ReadButton1(bool &fbutton, bool &_fbutton){ 
  static int secondReadD4 = 0;
  static int firstReadD4 = 0;
  
  firstReadD4 = secondReadD4;
  secondReadD4 =  digitalRead(button1);
  if (secondReadD4 == firstReadD4) {
    if (firstReadD4) {    
      fbutton =true;
      _fbutton =false;
    } else
      _fbutton =true;
  }
}

void ReadButton2(bool &fbutton2, bool &_fbutton2){ 
  static int secondReadD5 = 0;
  static int firstReadD5 = 0;
  
  firstReadD5 = secondReadD5;
  secondReadD5 =  digitalRead(button2);
  if (secondReadD5 == firstReadD5) {
    if (firstReadD5) {    
      fbutton2 =true;
      _fbutton2 =false;
    } else
      _fbutton2 =true;
  }
}
