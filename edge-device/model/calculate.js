module.exports = {
    average(result) {
        let averageObj = {
            room: '',
            temp: 0,
            humi: 0,
            light: 0,
            smoke: 0
        }
        // var x = parseFloat("0.0");
        var countTemp = 0;
        var countHumi = 0;
        var countLight = 0;
        var countSmoke = 0;
        averageObj.room = result[0].room;

        result.forEach(function (row) {
            //temp
            if (!isNaN(row.temp)) {
                averageObj.temp = averageObj.temp + row.temp;
                countTemp++;
            }
            //humi
            if (!isNaN(row.humi)) {
                averageObj.humi = averageObj.humi + row.humi;
                countHumi++;
            }
            //light
            if (!isNaN(row.light)) {
                averageObj.light = averageObj.light + row.light;
                countLight++;
            }
            //smoke
            if (!isNaN(row.smoke)) {
                averageObj.smoke = averageObj.smoke + row.smoke;
                countSmoke++;
            }
        })
        //temp average
        if (countTemp != 0) {
            averageObj.temp = averageObj.temp / countTemp;
            averageObj.temp = parseFloat((averageObj.temp).toFixed(2));
        } else {
            console.log("Input error temp")
        }
        //humi average
        if (countHumi != 0) {
            averageObj.humi = averageObj.humi / countHumi;
            averageObj.humi = parseFloat((averageObj.humi).toFixed(2));
        } else {
            console.log("Input error humi")
        }
        //light average
        if (countLight != 0) {
            averageObj.light = averageObj.light / countLight;
            averageObj.light = parseFloat((averageObj.light).toFixed(2));
        } else {
            console.log("Input error light")
        }
        //smoke average
        if (countSmoke != 0) {
            averageObj.smoke = averageObj.smoke / countSmoke;
            averageObj.smoke = parseFloat((averageObj.smoke).toFixed(2));
        } else {
            console.log("Input error light")
        }
        //
        // console.log(averageObj)
        return averageObj;
    },

    min(result) {
        let minObj = {
            room: '',
            temp: 10000,
            humi: 10000,
            light: 10000,
            smoke: 10000
        }

        minObj.room = result[0].room;

        result.forEach(function (row) {
            minObj.temp = Math.min(minObj.temp, row.temp)
            minObj.humi = Math.min(minObj.humi, row.humi)
            minObj.light = Math.min(minObj.light, row.light)
            minObj.smoke = Math.min(minObj.smoke, row.smoke)
        })

        return minObj;
    },

    max(result) {
        let maxObj = {
            room: '',
            temp: 0,
            humi: 0,
            light: 0,
            smoke: 0
        }

        maxObj.room = result[0].room;

        result.forEach(function (row) {
            maxObj.temp = Math.max(maxObj.temp, row.temp)
            maxObj.humi = Math.max(maxObj.humi, row.humi)
            maxObj.light = Math.max(maxObj.light, row.light)
            maxObj.smoke = Math.max(maxObj.smoke, row.smoke)
        })

        return maxObj;
    },

    increase(result) {
        let obj = {
            room: result.room,
            temp: false,
            light: false,
            smoke: false
        }
        let cTemp = 0;
        let cLigth = 0;
        let cSmoke = 0;

        for (let a = 0; a < result.length - 1; a++) {
            if (result[a].temp > result[ a+1].temp) {
                cTemp = 0;
            } else {
                cTemp++
            }
            
            if (result[a].light > result[a + 1].light) {
                cLigth = 0
            } else {
                cLigth++
            }
            //
            if (result[a].smoke > result[a + 1].smoke) {
                cSmoke = 0
            } else {
                cSmoke++
            }
        }
        ////
        if (cTemp == result.length - 1) {
            obj.temp = true;
        }
        if (cLigth == result.length - 1) {
            obj.light = true;
        }
        if (cSmoke == result.length - 1) {
            obj.smoke = true;
        }
        return obj
    },



    reduction(result) {
        let obj = {
            room: result.room,
            temp: false,
            light: false,
            smoke: false
        }
        let cTemp = 0;
        let cLigth = 0;
        let cSmoke = 0;

        for (let a = 0; a < result.length - 1; a++) {
            if (result[a].temp < result[ a+1].temp) {
                cTemp = 0;
            } else {
                cTemp++
            }
            
            if (result[a].light < result[a + 1].light) {
                cLigth = 0
            } else {
                cLigth++
            }
            //
            if (result[a].smoke < result[a + 1].smoke) {
                cSmoke = 0
            } else {
                cSmoke++
            }
        }
        ////
        if (cTemp == result.length - 1) {
            obj.temp = true;
        }
        if (cLigth == result.length - 1) {
            obj.light = true;
        }
        if (cSmoke == result.length - 1) {
            obj.smoke = true;
        }
        return obj
    },
}