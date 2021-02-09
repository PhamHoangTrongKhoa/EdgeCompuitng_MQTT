package com.lvtn.model;

import java.util.Date;
import java.util.List;

public class TimeReport extends Report {
    private List<TimeInfo> list;
    public TimeReport(Date from, Date to, List<TimeInfo> list) {
        super(from, to);
        this.list = list;
    }

    public List<TimeInfo> getList() {
        return list;
    }

    public void setList(List<TimeInfo> list) {
        this.list = list;
    }
}
