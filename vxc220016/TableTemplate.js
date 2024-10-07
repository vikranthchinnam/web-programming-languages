"use strict";
// Use code from template-processor.js directly here due to linting error "Var never used"
// when having TemplateProcessor in a seperate file.
function TemplateProcessor(template){
    function fillIn(dictionary) {
        let temp = this;
        let regex = "";
        Object.keys(dictionary).forEach(key => {
            regex = `{{${key}}}`;
            temp = temp.replaceAll(regex, `${dictionary[key]}`);
        });
        regex = /{{.*}}/g;
        temp = temp.replaceAll(regex, "");
        return temp;
    }
    this.fillIn = fillIn.bind(template);
    return this;
}

class TableTemplate {
    static fillIn(id, dictionary, columnName) {
        const table = document.querySelector(`#${id}`);
        const tableHeader = table.children[0].firstChild;
        let columnIndex = -1;
        let i = 0;
        // traverses through the table header and replaces the headings, 
        //and keeps track of index for the column index to be modified.
        for(const td of tableHeader.children){
            td.textContent = (new TemplateProcessor(td.textContent)).fillIn(dictionary);
            if(typeof(columnName) === "string" && columnName === td.textContent){
                columnIndex = i;
            }
            i++;
        }
        // Traverses through the rows, skipping the first row for header and 
        // filling in the table from the dictionary depending on columnName 
        let skipFirst = true;
        for(const tr of table.children[0].children){
            if(skipFirst){
                skipFirst = !skipFirst;
            }
            else if(typeof(columnName) === "string" && columnIndex > -1){
                const td = tr.children[columnIndex];
                td.textContent = (new TemplateProcessor(td.textContent)).fillIn(dictionary);
            }
            else if(typeof(columnName) !== "string"){
                for(const td of tr.children){
                    td.textContent = (new TemplateProcessor(td.textContent)).fillIn(dictionary);
                }
            }
            else {
                break;
            }
        }
        // Sets the table to visible
        if(table.style.visibility === "hidden"){
            table.style.visibility = "visible";
        }
    }
}