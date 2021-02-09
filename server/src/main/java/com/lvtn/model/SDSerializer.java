package com.lvtn.model;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class SDSerializer extends StdSerializer<StandardValue> {

    public SDSerializer(){
        this(null);
    }

    public SDSerializer(Class<StandardValue> t) {
        super(t);
    }

    @Override
    public void serialize(StandardValue standardValue, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", standardValue.getRoom().getId());
        jsonGenerator.writeNumberField("temp", standardValue.getT());
        jsonGenerator.writeNumberField("humi", standardValue.getH());
        jsonGenerator.writeNumberField("smoke", standardValue.getS());
        jsonGenerator.writeNumberField("light", standardValue.getL());
        jsonGenerator.writeEndObject();
    }
}
