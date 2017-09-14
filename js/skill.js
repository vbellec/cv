window.onload = function () {
    var skillSvg =  document.getElementById('object-skill').contentDocument.getElementById('skill-svg');

    var skillPhp = skillSvg.getElementById('skill-svg-php');

    var txtSkill = document.getElementById('txt-skill');

    function clearTxtSkill () {
        txtSkill.textContent = "";
    }

    function writeTxtSkill (txt) {
        clearTxtSkill();

        if (Array.isArray(txt) === true) {
            txt.forEach(function(element) {
                textContent += element;
            }, this);
        } else {
            txtSkill.textContent = txt;
        }
    }

    skillPhp.addEventListener('mouseover', function (evt) {
        var title = 'PHP';
        var txt = "Cours de PHP dans mon BTS."

        writeTxtSkill(txt);
    });

}
