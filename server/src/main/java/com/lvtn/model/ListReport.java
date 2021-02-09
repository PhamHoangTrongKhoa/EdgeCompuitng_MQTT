package com.lvtn.model;

import java.util.Date;
import java.util.List;

public class ListReport extends Report {
    private List<ListInfo> list;

    public ListReport(Date from, Date to, List<ListInfo> list) {
        super(from, to);
        this.list = list;
    }

    public List<ListInfo> getList() {
        return list;
    }

    public void setList(List<ListInfo> list) {
        this.list = list;
    }
}
