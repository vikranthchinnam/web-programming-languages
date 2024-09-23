"use strict";
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
