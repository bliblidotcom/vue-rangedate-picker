<template>
  <div class="root">
    <h2 class="root__title">{{captions.title}}</h2>
    Selected Range: {{dateRange.start}} - {{dateRange.end}}<br/>
    <div class="calendar">
      <div class="calendar-wrap">
        <div :class="s.firstDate">
          <div class="months-text">
            <i class="left" @click="goPrevMonth"></i>
            {{months[startActiveMonth] +' '+ startActiveYear}}</div>
            <ul :class="s.daysWeeks">
              <li v-for="item in shortDays">{{item}}</li>
            </ul>
            <ul v-for="r in 6" :class="[s.days]">
              <li :class="[{[s.daysSelected]: isDateSelected(r, i, 'first', startMonthDay, endMonthDate),
              [s.daysInRange]: isDateInRange(r, i, 'first', startMonthDay, endMonthDate)}]" v-for="i in numOfDays" v-html="getDayCell(r, i, startMonthDay, endMonthDate)"
                @click="selectFirstItem(r, i)"></li>
            </ul>
        </div>
        <div :class="s.secondDate">
          <div class="months-text">
            {{months[startNextActiveMonth] +' '+ startActiveYear}}
            <i class="right" @click="goNextMonth"></i>
          </div>
          <ul :class="s.daysWeeks">
              <li v-for="item in shortDays">{{item}}</li>
          </ul>
          <ul v-for="r in 6" :class="[s.days]">
            <li :class="[{[s.daysSelected]: isDateSelected(r, i, 'second', startNextMonthDay, endNextMonthDate),
            [s.daysInRange]: isDateInRange(r, i, 'second', startNextMonthDay, endNextMonthDate)}]" v-for="i in numOfDays" v-html="getDayCell(r, i, startNextMonthDay, endNextMonthDate)"
                  @click="selectSecondItem(r, i)"></li>
          </ul>
        </div>
      </div>
      <div class="calendar-range">
        <ul class="calendar_preset">
          <li class="calendar_preset-ranges" v-for="item in finalPresetRanges" @click="updatePreset(item)">
            {{item.label}}
          </li>
          <li><button>{{captions.ok_button}}</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script src="./js/rangedate-picker.js"></script>

<style lang="css">
.calendar{
  display: block;
  width: 700px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
}
.months-text {
  text-align: center;
  font-weight: bold;
}
.months-text .left{
  float:left;
  cursor: pointer;
  width:16px;
  height:16px;
  background-image: url('data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxLjQ5NCAzMS40OTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMxLjQ5NCAzMS40OTQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTEwLjI3Myw1LjAwOWMwLjQ0NC0wLjQ0NCwxLjE0My0wLjQ0NCwxLjU4NywwYzAuNDI5LDAuNDI5LDAuNDI5LDEuMTQzLDAsMS41NzFsLTguMDQ3LDguMDQ3aDI2LjU1NCAgYzAuNjE5LDAsMS4xMjcsMC40OTIsMS4xMjcsMS4xMTFjMCwwLjYxOS0wLjUwOCwxLjEyNy0xLjEyNywxLjEyN0gzLjgxM2w4LjA0Nyw4LjAzMmMwLjQyOSwwLjQ0NCwwLjQyOSwxLjE1OSwwLDEuNTg3ICBjLTAuNDQ0LDAuNDQ0LTEuMTQzLDAuNDQ0LTEuNTg3LDBsLTkuOTUyLTkuOTUyYy0wLjQyOS0wLjQyOS0wLjQyOS0xLjE0MywwLTEuNTcxTDEwLjI3Myw1LjAwOXoiIGZpbGw9IiMwMDZERjAiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==');
}
.months-text .right{
  float:right;
  cursor: pointer;
  width:16px;
  height:16px;
  background-image: url('data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxLjQ5IDMxLjQ5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMS40OSAzMS40OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8cGF0aCBkPSJNMjEuMjA1LDUuMDA3Yy0wLjQyOS0wLjQ0NC0xLjE0My0wLjQ0NC0xLjU4NywwYy0wLjQyOSwwLjQyOS0wLjQyOSwxLjE0MywwLDEuNTcxbDguMDQ3LDguMDQ3SDEuMTExICBDMC40OTIsMTQuNjI2LDAsMTUuMTE4LDAsMTUuNzM3YzAsMC42MTksMC40OTIsMS4xMjcsMS4xMTEsMS4xMjdoMjYuNTU0bC04LjA0Nyw4LjAzMmMtMC40MjksMC40NDQtMC40MjksMS4xNTksMCwxLjU4NyAgYzAuNDQ0LDAuNDQ0LDEuMTU5LDAuNDQ0LDEuNTg3LDBsOS45NTItOS45NTJjMC40NDQtMC40MjksMC40NDQtMS4xNDMsMC0xLjU3MUwyMS4yMDUsNS4wMDd6IiBmaWxsPSIjMDA2REYwIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=')
}
.calendar ul {
  list-style-type: none;
}
.calendar-wrap{
  display: inline-block;
  float:left;
  width: 65%;
  padding: 2px;
}
.calendar-range{
  float: left;
  padding: 0 12px;
  border: 1px solid #ccc;
}

.calendar_month_left,
.calendar_month_right {
  float: left;
  width: 45%;
  padding: 10px;
  border: 1px solid #ccc;
}

.calendar_weeks {
  margin: 0;
  padding: 10px 0;
  width: auto;
}

.calendar_weeks li {
  display: inline-block;
  width: 13.6%;
  color: #999;
  
  text-align: center;
}

.calendar_days {
  margin: 0;
  padding: 0;
}

.calendar_days li {
  display: inline-block;
  width: 13.6%;
  color: #333;
  text-align: center;
  cursor: pointer;
  line-height: 2em;
}

.calendar_days li:hover {
  background: #eee;
  color: #000;
}

li.calendar_days_selected {
  background: #0096d9;
  color: #fff;
}

li.calendar_days_in-range {
  background: #0096d9;
  color: #fff;
}

.calendar_preset{
  padding: 0;
}
.calendar_preset li {
  line-height: 2.6em;
  width: auto;
  display: block;
}
.calendar_preset li.calendar_preset-ranges{
  padding: 0 30px 0px 10px;
  margin-bottom: 5px;
  cursor: pointer;
  margin-top: 1px;
}
.calendar_preset li.calendar_preset-ranges:hover {
 background: #ddd;
}

</style>
