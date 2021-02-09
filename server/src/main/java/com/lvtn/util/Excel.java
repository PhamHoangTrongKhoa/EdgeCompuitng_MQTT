package com.lvtn.util;

import com.lvtn.model.ListInfo;
import com.lvtn.model.ListReport;
import com.lvtn.model.TimeInfo;
import com.lvtn.model.TimeReport;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Component
public class Excel {
    private static final Logger log = LogManager.getLogger();
    public File writeToExcel(TimeReport rp, ListReport lp){
        int i = 1;
        int j = 1;
        XSSFWorkbook workbook = new XSSFWorkbook();
        //SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd");
        Sheet report = workbook.createSheet("report");
        Row header = report.createRow(0);
        CellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        CellStyle dateCell = workbook.createCellStyle();
        CreationHelper helper = workbook.getCreationHelper();
        dateCell.setDataFormat(helper.createDataFormat().getFormat("mm/dd/yy hh:mm"));
        XSSFFont font = workbook.createFont();
        font.setFontName("Arial");
        font.setFontHeightInPoints((short)14);
        font.setBold(true);
        headerStyle.setFont(font);
        Cell h1 = header.createCell(0);
        Cell h2 = header.createCell(1);
        Cell h3 = header.createCell(2);
        h1.setCellValue("Name");
        h1.setCellStyle(headerStyle);
        h2.setCellValue("Value");
        h2.setCellStyle(headerStyle);
        h3.setCellValue("Time");
        h3.setCellStyle(headerStyle);
        Sheet extra = workbook.createSheet("extra");
        Row eHeader = extra.createRow(0);
        Cell eh1 = eHeader.createCell(0);
        Cell eh2 = eHeader.createCell(1);
        Cell eh3 = eHeader.createCell(2);
        eh1.setCellValue("Name");
        eh1.setCellStyle(headerStyle);
        eh2.setCellValue("N");
        eh2.setCellStyle(headerStyle);
        eh3.setCellValue("Time");
        eh3.setCellStyle(headerStyle);
        for(TimeInfo info : rp.getList()){
            Row row = report.createRow(i++);
            Cell c0 = row.createCell(0);
            Cell c1 = row.createCell(1);
            Cell c2 = row.createCell(2);
            c0.setCellValue(info.getDes());
            c1.setCellValue(info.getData());
            c2.setCellValue(info.getTime());
            c2.setCellStyle(dateCell);
        }
        for(ListInfo info:lp.getList()){
            for(int k=0;k<info.getData().size();k++){
                Row row = report.createRow(j+k);
                Cell c0 = row.createCell(0);
                Cell c1 = row.createCell(1);
                Cell c2 = row.createCell(2);
                Cell c3 = row.createCell(2);
                if(k==0){
                    c0.setCellValue(info.getDes());
                    c1.setCellValue(info.getData().size());
                    c2.setCellValue(info.getData().get(k).data);
                    c3.setCellValue(info.getData().get(k).time);
                }
            }
        }
        report.autoSizeColumn(0);
        report.autoSizeColumn(2);
        extra.autoSizeColumn(0);
        extra.autoSizeColumn(3);
        File file = new File(".");
        String path = file.getAbsolutePath();
        String fileLoc = path.substring(0,path.length()-1)+workbook.getSheetName(0)+".xlsx";
        try {
            FileOutputStream fileOutputStream = new FileOutputStream(fileLoc);
            workbook.write(fileOutputStream);
            fileOutputStream.close();
            return new File(fileLoc);
        }catch (IOException io){
            log.info(io.getMessage());
            return null;
        }
    }
}
