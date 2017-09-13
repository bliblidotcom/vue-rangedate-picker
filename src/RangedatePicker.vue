<template>
  <div class="root">
    <h2 class="root__title">{{captions.title}}</h2>
    Current Year: {{startActiveYear}}<br>
    Selected Range: {{dateRange.start}} - {{dateRange.end}}<br/>
    <button @click="goPrevMonth">Prev</button>
    <div :class="s.firstDate">
      <div>{{months[startActiveMonth]}}</div>
      <span :class="s.daysName" v-for="item in shortDays">{{item}} </span>
      <div v-for="r in 6">
        <span :class="[s.days, {[s.daysSelected]: isDateSelected(r, i, 'first', startMonthDay),
         [s.daysInRange]: isDateInRange(r, i, 'first', startMonthDay)}]"
          v-for="i in numOfDays" v-html="getDayCell(r, i, startMonthDay, endMonthDate)"
          @click="selectFirstItem(r, i)"></span>
      </div>
    </div>
    <div :class="s.secondDate">
      <div>{{months[startNextActiveMonth]}}</div>
      <span :class="s.daysName"  v-for="item in shortDays">{{item}} </span>
      <div v-for="r in 6">
        <span :class="[s.days, {[s.daysSelected]: isDateSelected(r, i, 'second', startNextMonthDay),
         [s.daysInRange]: isDateInRange(r, i, 'second', startNextMonthDay)}]"
              v-for="i in numOfDays" v-html="getDayCell(r, i, startNextMonthDay, endNextMonthDate)"
              @click="selectSecondItem(r, i)"></span>
      </div>
    </div>
    <button @click="goNextMonth">Next</button>
    <div>
      <div class="root__preset-ranges" v-for="item in finalPresetRanges" @click="updatePreset(item)">
        {{item.label}}
      </div>
    </div>
    <div><button>{{captions.ok_button}}</button></div>
  </div>
</template>

<script src="./js/rangedate-picker.js"></script>

<style lang="css" scoped>
.root {
  width: 500px;
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
.root__first-date {
  display: inline-block;
  width: 50%;
}
.root__second-date {
  display: inline-block;
  width: 50%;
}
.root__preset-ranges {
  cursor: pointer
}
</style>
