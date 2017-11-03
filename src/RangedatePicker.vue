<template>
  <div class="calendar-root">
    <div class="input-date" @click="toggleCalendar()" v-if="!isCompact"> {{getDateString(dateRange.start)}} - {{getDateString(dateRange.end)}}</div>
    <div class="calendar" :class="{'calendar-mobile ': isCompact, 'calendar-right-to-left': isRighttoLeft}" v-if="isOpen">
      <div class="calendar-head" v-if="!isCompact">
        <h2>{{captions.title}}</h2>
        <i class="close" @click="toggleCalendar()"></i>
      </div>
      <div class="calendar-head" v-if="isCompact">
        <p>{{captions.title}}</p>
        <div class="input-date" @click="toggleCalendar()" v-if="isCompact">{{getDateString(dateRange.start)}} - {{getDateString(dateRange.end)}}</div>
      </div>
      <div class="calendar-wrap">
        <div class="calendar_month_left" :class="{'calendar-left-mobile': isCompact}" v-if="showMonth">
          <div class="months-text">
            <i class="left" @click="goPrevMonth"></i>
            <i class="right" @click="goNextMonth" v-if="isCompact"></i>
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
        <div class="calendar_month_right" v-if="!isCompact">
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
      <div class="calendar-range" :class="{'calendar-range-mobile ': isCompact}" v-if="!showMonth || !isCompact">
        <ul class="calendar_preset">
          <li
            class="calendar_preset-ranges"
            v-for="(item, idx) in finalPresetRanges"
            :key="idx"
            @click="updatePreset(item)"
            :class="{'active-preset': presetActive === item.label}">
            {{item.label}}
          </li>
          <li><button class="calendar-btn-apply" @click="setDateValue()">{{captions.ok_button}}</button></li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script src="./js/rangedate-picker.js"></script>

<style lang="css">

.input-date{
  display: block;
  padding: 0;
  font-size: 14px;
  width: 238px;
  cursor: pointer;
  color: #0096d9;
  font-weight: bold;
}
.input-date:after{
  content:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAAYUlEQVR42mNgAAI1DbUFqhqqCQxYgKqqqoG6hvoBBQUFAQZiAMggoIb/IIxuKMgwNXW1DyA5kKUMxAKQYnRDUQxTV7tAtAuxGQpkN1BkGDZDKTYM3VCqGAYD6urqBeQaBgDrSi1zSYFa1wAAAABJRU5ErkJggg==');
  float:right;
  font-size: smaller;
}
.input-date--title {
  border: 1px solid #ccc;
  border-radius: 4px;
}
.input-date--title:before {
  content:"";
  padding: 5px 0;
  display: block;
}
.calendar_preset li.calendar_preset-ranges.active-preset {
  border: 1px solid #0096d9;
  border-radius: 3px;
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
.calendar-root,
.calendar-title {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.calendar-right-to-left {
  margin-left: -460px;
}
.calendar{
  display: block;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  width: 700px;
  font-size: 12px;
  height: 300px;
  box-shadow: -3px 4px 12px -1px #ccc;
  background: #fff;
  position: absolute;
  z-index: 9;
}
.calendar-head h2{
  padding: 20px 0px 0px 20px;
  margin: 0px;
}
.close:hover{
  cursor: pointer;
}
.close:after{
  content: "❌";
  font-style: normal;
  float: right;
  padding: 10px;
  margin-top: -35px;
  font-size: 1.5em;
}
.calendar ul {
  list-style-type: none;
}
.calendar-wrap{
  display: inline-block;
  float:left;
  width: 75%;
  padding: 10px;
}
.calendar-range{
  float: left;
  padding: 0 12px;
  border-left: 1px solid #ccc;
  margin: 15px -2px;
}
.calendar-left-mobile{
  width: 100% !important;
}
.calendar_month_left,
.calendar_month_right {
  float: left;
  width: 43%;
  padding: 10px;
  margin: 5px;
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
 background: #eee;
}
.calendar-btn-apply {
  width: 100%;
  background: #f7931e;
  color: #fff;
  border: none;
  padding: 9px;
  font-size: 14px;
}

/* isCompact */
.calendar-mobile {
  width: 260px;
  z-index: 1;
  box-shadow: none;
}
.calendar-mobile .calendar-head {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
}
.calendar-mobile .calendar-head p {
  padding:0 0 5px;
  font-size: 14px;
  color: #333;
  margin: 0;
}
.calendar-mobile .calendar-wrap {
  padding: 0;
  width: 100%;
}
.calendar-mobile .calendar_month_left {
  padding: 0;
  margin: 20px 0 0;
}
.calendar-mobile .months-text {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  padding-bottom: 15px;
}
.calendar-mobile .calendar_weeks li, .calendar-mobile .calendar_days li {
  width: 14.2%;
  font-size: 14px;
}
.calendar-mobile .calendar_days li {
  line-height: 2.5em;
}
.calendar-mobile .calendar_preset li.calendar_preset-ranges{
  padding: 0 30px 0px 10px;
  margin-bottom: 5px;
  cursor: pointer;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}
.calendar-mobile .calendar_preset li.calendar_preset-ranges.active-preset {
  border: 1px solid #0096d9;
}
.calendar-mobile .calendar-btn-apply {
  width: 100%;
  background: #f7931e;
  color: #fff;
  border: none;
  padding: 12px 0;
  font-size: 18px;
  margin-top: 30px;
  border-radius: 2px;
}
.calendar-range-mobile{
  width: 100%;
  padding: 5px 0 10px;
  border-left: none;
  margin: 0px;
}
/* end isCompact */


</style>
