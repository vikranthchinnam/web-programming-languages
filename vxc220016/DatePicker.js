"use strict";

class DatePicker{
    constructor(id, callback){
        this.id = id;
        this.callback = callback;
    }

    render(date){
        const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        const months = {
            0: 31, 
            1: 31, 
            2: 28, 
            3: 31, 
            4: 30, 
            5: 31, 
            6: 30, 
            7: 31, 
            8: 31, 
            9: 30, 
            10: 31, 
            11: 30, 
            12: 31, 
            13: 31
        };
        const monthName = {
            1: "January", 
            2: "February", 
            3: "March", 
            4: "April", 
            5: "May", 
            6: "June", 
            7: "July", 
            8: "August", 
            9: "September", 
            10: "October", 
            11: "November", 
            12: "December",
        };
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        const dateDiv = document.body.querySelector(`#${this.id}`);
        const datePicker = document.createElement("div");
        const dateHeader = document.createElement("div");
        const leftButton = document.createElement("button");
        leftButton.textContent = "<";
        const rightButton = document.createElement("button");
        rightButton.textContent = ">";
        const dates = document.createElement("table");
        datePicker.appendChild(dateHeader);
        datePicker.appendChild(dates);
        dateDiv.appendChild(datePicker);
        function selectMonth(event){
            const day = event.target.textContent;
            this.callback.call(null, this.id, {day, month: month, year});
        }
        function renderMonth(){
            dateHeader.innerHTML = '';
            dateHeader.appendChild(leftButton);
            dateHeader.appendChild(document.createTextNode(`${monthName[month]} ${year}`));
            dateHeader.appendChild(rightButton);
            let curDate = 1;
            const finalDate = months[month];
            dates.innerHTML = '';
            for(let i = 0; i < 7; i++){
                const tr = dates.insertRow();
                let cellCount = 1;
                if(i === 0){
                    for(const day of days){
                        const td = tr.insertCell();
                        td.appendChild(document.createTextNode(`${day}`));
                    }
                    continue;
                }
                else if(i === 1){
                    const firstDay = (new Date(year, month-1, 1)).getDay();
                    if(firstDay === 0){
                        continue;
                    }
                    const prevMonthDays = months[month-1];
                    for(let j = firstDay; j > 0; j--){
                        const td = tr.insertCell();
                        const textNode = document.createElement('p');
                        textNode.appendChild(document.createTextNode(`${prevMonthDays-j+1}`));
                        textNode.setAttribute("class", "dim");
                        td.appendChild(textNode);
                        cellCount++;
                    }
                }
                while(cellCount % 8 !== 0){
                    if(curDate > finalDate){
                        break;
                    }
                    const td = tr.insertCell();
                    td.appendChild(document.createTextNode(`${curDate}`));
                    td.addEventListener("click", selectMonth.bind(this));
                    curDate++;
                    cellCount++;
                }
                if(curDate > finalDate){
                    let nextMonthDays = 1;
                    while(cellCount % 8 !== 0){
                        const td = tr.insertCell();
                        const textNode = document.createElement('p');
                        textNode.appendChild(document.createTextNode(`${nextMonthDays}`));
                        textNode.setAttribute("class", "dim");
                        td.appendChild(textNode);
                        nextMonthDays++;
                        cellCount++;
                    }
                    break;
                }
            }
        }
        function incrementMonth(){
            month++;
            if(month === 13){
                year++;
                month=1;
            }
            renderMonth.call(this);
        }
        function decrementMonth(){
            month--;
            if(month === 0){
                year--;
                month=12;
            }
            renderMonth.call(this);
        }
        rightButton.addEventListener("click", incrementMonth.bind(this));
        leftButton.addEventListener("click", decrementMonth.bind(this));
        renderMonth.call(this);
        
        const maxWidth = dates.offsetWidth;
        dateHeader.setAttribute("class", "evenlySpaced");
        dateHeader.setAttribute("style", `max-width: ${maxWidth-20}px;`);
    }
}

