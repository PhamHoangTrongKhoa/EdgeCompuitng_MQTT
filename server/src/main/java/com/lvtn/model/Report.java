package com.lvtn.model;

import java.util.Date;
import java.util.List;

public class Report {
    private Date from;
    private Date to;

    public Report(Date from, Date to) {
        this.from = from;
        this.to = to;
    }

    public Date getFrom() {
        return from;
    }

    public void setFrom(Date from) {
        this.from = from;
    }

    public Date getTo() {
        return to;
    }

    public void setTo(Date to) {
        this.to = to;
    }
}
