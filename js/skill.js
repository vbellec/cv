window.onload = function () {
    var objpSkill = document.getElementById('p-skill');
    var svgSkill = document.getElementById('skill-svg');

    svgSkill.onload = function () {
        let php = document.getElementById('skill-svg-php');
        alert("Hello svg !");

        console.log(php);
    }
}
