<template>
  <div class="root">
    <h2 class="root__title">{{captions.title}}</h2>
    Selected Range: {{dateRange.start}} - {{dateRange.end}}<br/>
    <div class="calendar">
      <div class="calendar-wrap">
        <div :class="s.firstDate">
          <div class="months-text">
            <span class="left" @click="goPrevMonth">&#8592;</span>
            {{months[startActiveMonth] +' '+ startActiveYear}}</div>
            <ul :class="s.daysWeeks">
              <li v-for="item in shortDays">{{item}}</li>
            </ul>
            <ul v-for="r in 6" :class="[s.days]">
              <li :class="[{[s.daysSelected]: isDateSelected(r, i, 'first', startMonthDay),
              [s.daysInRange]: isDateInRange(r, i, 'first', startMonthDay)}]" v-for="i in numOfDays" v-html="getDayCell(r, i, startMonthDay, endMonthDate)"
                @click="selectFirstItem(r, i)"></li>
            </ul>
        </div>
        <div :class="s.secondDate">
          <div class="months-text">
            {{months[startNextActiveMonth] +' '+ startActiveYear}}
            <span class="right" @click="goNextMonth">&#8594;</span>
          </div>
          <ul :class="s.daysWeeks">
              <li v-for="item in shortDays">{{item}}</li>
          </ul>
          <ul v-for="r in 6" :class="[s.days]">
            <li :class="[{[s.daysSelected]: isDateSelected(r, i, 'second', startNextMonthDay),
            [s.daysInRange]: isDateInRange(r, i, 'second', startNextMonthDay)}]" v-for="i in numOfDays" v-html="getDayCell(r, i, startNextMonthDay, endNextMonthDate)"
                  @click="selectSecondItem(r, i)"></li>
          </ul>
        </div>
      </div>
      <div class="calendar-range">
        <div class="root__preset">
          <div class="root__preset-ranges" v-for="item in finalPresetRanges" @click="updatePreset(item)">
            {{item.label}}
          </div>
        </div>
        <div><button>{{captions.ok_button}}</button></div>
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
}
.months-text .right{
  float:right;
}
.calendar ul {
  list-style-type: none;
}
.calendar-wrap{
  display: inline-block;
  float:left;
  border: 1px solid #000;
  width: 60%;
  padding: 2px;
}
.calendar-range{
  float: left;
  padding:10px;
  border: 1px solid #000;
}

.calendar_month_left {
  border-right: 1px solid #ccc;
  display: inline-block;
  float: left;
  width: 50%;
}

.calendar_month_right {
  float:left;
  width: 48%;
}

.calendar_weeks {
  margin: 0;
  padding: 10px 0;
  width: auto;
}

.calendar_weeks li {
  display: inline-block;
  width: 13.6%;
  color: #333333;
  text-align: center;
}

.calendar_days {
  margin: 0;
  padding: 0;
}

.calendar_days li {
  display: inline-block;
  width: 13.6%;
  color: #999;
  text-align: center;
  cursor: pointer;
  line-height: 2em;
}

li.calendar_days_selected {
  background: #0096d9;
  color: #fff;
}

li.calendar_days_in-range {
  background: #0096d9;
  color: #fff;
}

/* .root {
  width: 600px;
}
.root__title {
    color: blue;
  }
.root__days-name {
    display: inline;
    width: 12.5%;
  }
.root__days {
  display: inline;
  width: 12.5%;
  cursor: pointer;
  margin-right: 10px;
}
.root__days__selected {
  background-color: lightblue;
}
.root__days__in-range {
  background-color: lightgray;
}
.calendar_month_left {
  border:1px solid #ccc;
  display: inline-block;
}
.calendar_month_right {
  border:1px solid #ccc;
  float:left;
}
.root__preset {
  display:block;
  float:left;
}
.root__preset-ranges {
  float:left;
  cursor: pointer
} */
</style>
