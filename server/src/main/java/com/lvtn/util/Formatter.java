package com.lvtn.util;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Formatter {
    public static String formatDate(Date date){
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        return formatter.format(date);
    }

    public static Date parseTime(String sTime){
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        try {
            return formatter.parse(sTime);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static Date parseDate(String sDate){
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-mm-dd");
        try {
            return formatter.parse(sDate);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static Double formatNumber(double d, int pre){
        BigDecimal bd = BigDecimal.valueOf(d);
        return bd.round(new MathContext(pre, RoundingMode.CEILING)).doubleValue();
    }
}
