"use strict";

function DatePicker(id, callback){
    function render(id, callback, date){
        const day = date.getDate();
        //const month = date.getMonth() + 1;
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        // callback.call(null, id, {day, month, year});
        const dateDiv = document.body.querySelector(`#${id}`);
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
        function incrementMonth(event){
            month++;
            if(month === 13){
                year++;
                month=1;
            }
            renderMonth.call(this);
        }
        function decrementMonth(event){
            month--;
            if(month === 0){
                year--;
                month=12;
            }
            renderMonth.call(this);
        }
        function selectMonth(event){
            const day = event.target.textContent;
            callback.call(null, id, {day, month: month, year});
        }
        rightButton.addEventListener("click", incrementMonth.bind(this));
        leftButton.addEventListener("click", decrementMonth.bind(this));
        /*
        // dateHeader.appendChild(leftButton);
        // dateHeader.appendChild(document.createTextNode(`${this.monthName[curMonth]} ${year}`));
        // dateHeader.appendChild(rightButton);
        
        // for(let i = 0; i < 7; i++){
        //     const tr = dates.insertRow();
        //     let cellCount = 1;
        //     if(i == 0){
        //         for(const day of this.days){
        //             const td = tr.insertCell();
        //             td.appendChild(document.createTextNode(`${day}`))
        //         }
        //         continue;
        //     }
        //     else if(i == 1){
        //         const firstDay = (new Date(year, curMonth-1, 1)).getDay();
        //         let prevMonthDays = this.months[curMonth-1];
        //         for(let j = firstDay+1; j > 0; j--){
        //             const td = tr.insertCell();
        //             td.appendChild(document.createTextNode(`${prevMonthDays-j+1}`))
        //             cellCount++;
        //         }
                
        //     }
        //     // console.log(`${cellCount}`)
        //     while(cellCount % 8 != 0){
        //         if(curDate > finalDate){
        //             break;
        //         }
        //         const td = tr.insertCell();
        //         td.appendChild(document.createTextNode(`${curDate}`));
        //         curDate++;
        //         cellCount++;
        //     }
        //     if(curDate > finalDate){
        //         let nextMonthDays = 1;
        //         while(cellCount % 8 != 0){
        //             const td = tr.insertCell();
        //             td.appendChild(document.createTextNode(`${nextMonthDays}`));
        //             nextMonthDays++;
        //             cellCount++;
        //         }
        //         break;
        //     }
        // }*/
        renderMonth.call(this);
        function renderMonth(){
            dateHeader.innerHTML = '';
            dateHeader.appendChild(leftButton);
            dateHeader.appendChild(document.createTextNode(`${this.monthName[month]} ${year}`));
            dateHeader.appendChild(rightButton);
            let curDate = 1;
            let finalDate = this.months[month];
            dates.innerHTML='';
            for(let i = 0; i < 7; i++){
                const tr = dates.insertRow();
                let cellCount = 1;
                if(i == 0){
                    for(const day of this.days){
                        const td = tr.insertCell();
                        td.appendChild(document.createTextNode(`${day}`));
                    }
                    continue;
                }
                else if(i == 1){
                    const firstDay = (new Date(year, month-1, 1)).getDay();
                    if(firstDay == 0){
                        continue;
                    }
                    let prevMonthDays = this.months[month-1];
                    for(let j = firstDay; j > 0; j--){
                        const td = tr.insertCell();
                        const textNode = document.createElement('p');
                        textNode.appendChild(document.createTextNode(`${prevMonthDays-j+1}`));
                        textNode.setAttribute("class", "dim");
                        td.appendChild(textNode);
                        cellCount++;
                    }
                    
                }
                while(cellCount % 8 != 0){
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
                    while(cellCount % 8 != 0){
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
        const maxWidth = dates.offsetWidth;
        dateHeader.setAttribute("class", "evenlySpaced")
        dateHeader.setAttribute("style", `max-width: ${maxWidth-20}px;`);
    }
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const months = {0:31, 1:31, 2:28, 3:31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:31, 13:31}
    const monthName = {1:"January", 2:"February", 3:"March", 4:"April", 5:"May", 6:"June", 7:"July", 8:"August", 9:"September", 10:"October", 11:"November", 12:"December"}
    this.render = render.bind({days, months, monthName}, id, callback);
    return this;
}