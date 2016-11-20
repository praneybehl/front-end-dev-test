'use strict';

// jshint expr: true

var utils = require("../app/Global/js/Utils"),
    chai = require("chai"),
    expect = chai.expect,
    mjsdom = require('mocha-jsdom'),
    mlog = require("mocha-logger");

chai.should();

describe("getMS", function () {

    it("should return an object.", function(){
        utils.getMS().should.be.an('object');
    });

    it("should contain object with different properties oneSec, oneMin, oneHour, oneDay & oneYear.", function(){
        utils.getMS().should.have.property('oneSec').to.equal(1000);
        utils.getMS().should.have.property('oneMin').to.equal(1000 * 60);
        utils.getMS().should.have.property('oneHour').to.equal(1000 * 60 * 60);
        utils.getMS().should.have.property('oneDay').to.equal(1000 * 60 * 60 * 24);
        utils.getMS().should.have.property('oneYear').to.equal(1000 * 60 * 60 * 24 * 365);
    });
});

describe("getUnitsFromMS", function () {

    var ms = 86400000;

    it("should return an object.", function(){
        utils.getUnitsFromMS(ms).should.be.an('object');
    });

    it("should contain object with different properties: secs, mins, hours, & days.", function(){
        utils.getUnitsFromMS(ms).should.have.property('secs').to.equal(ms / 1000);
        utils.getUnitsFromMS(ms).should.have.property('mins').to.equal(ms / 1000 / 60);
        utils.getUnitsFromMS(ms).should.have.property('hours').to.equal(ms / 1000 / 60 / 60);
        utils.getUnitsFromMS(ms).should.have.property('days').to.equal(ms / 1000 / 60 / 60 / 24);
    });
});

describe("getWeekDay", function () {

    var daysShort = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    it("should return a string.", function(){
        utils.getWeekDay().should.be.a('string');
    });

    it("should return today's day of the week's full name if no parameter are provided.", function(){
        utils.getWeekDay().should.equal(days[new Date().getDay()]);
    });

    it("should return the day by index from the days array.", function(){
        utils.getWeekDay(5, true).should.equal(days[5]);
    });

    it("should return null if the day by index is greater than or equal to 7", function(){
        expect(utils.getWeekDay(11, true)).to.equal(null);
        expect(utils.getWeekDay(11, true, true)).to.equal(null);
    });

    it("should return short name if third param 'useShort' is true.", function(){
        expect(utils.getWeekDay(3, true, true)).to.equal(daysShort[3]);
        expect(utils.getWeekDay(3, true, true)).to.have.length(3);
    });
});


describe("getMonthName", function () {

    var monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    it("should return a string.", function(){
        utils.getMonthName().should.be.a('string');
    });

    it("should return current month's full name if no parameter are provided.", function(){
        utils.getMonthName().should.equal(months[new Date().getMonth()]);
    });

    it("should return the month by index from the months array.", function(){
        utils.getMonthName(5, true).should.equal(months[5]);
    });

    it("should return null if the month by index is greater than or equal to 12", function(){
        expect(utils.getMonthName(12, true)).to.equal(null);
        expect(utils.getMonthName(12, true, true)).to.equal(null);
    });

    it("should return short name if third param 'useShort' is true.", function(){
        expect(utils.getMonthName(5, true, true)).to.have.length(3);
    });
});

describe("toPascalCase", function(){
    var str = "LEVO HAS OFFICES IN SYDNEY NSW AND MELBOURNE VIC.";

    it("should return a string.", function(){
        utils.toPascalCase(str).should.be.a('string');
    });
});

describe("getUID", function(){
    var prefix = "id";

    it("should return a string.", function(){
        utils.getUID().should.be.a('string');
    });
    it("should contain prefix string if provided.", function(){
        utils.getUID(prefix).indexOf(prefix).should.equal(0);
    });
});

describe("replaceBetween", function(){
    var str = "LEVO HAS OFFICES IN SYDNEY NSW AND MELBOURNE VIC.",
        replacementString = "IS AWESOMELY LOCATED IN",
        rxStart = "HAS",
        rxEnd = "AND";

    it("should return a string.", function(){
        utils.replaceBetween(rxStart, rxEnd, str).should.be.a('string');
    });
});

describe("getTextLines", function(){
    mjsdom();

    var parent, el;

    it("should return a number.", function(){
        parent = document.createElement('div');
        el = document.createElement('div');
        el.innerText = 'If your business needs a compelling, engaging, functional website, customer application, database or mobile app - Levo can help.';
        parent.appendChild(el);
        document.body.appendChild(parent);

        utils.getTextLines(el).should.be.a('number');
    });

});