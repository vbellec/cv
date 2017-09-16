window.onload = function () {
    var skillSvg =  document.getElementById('object-skill').contentDocument.getElementById('skill-svg');
    var skillSvgs = skillSvg.querySelectorAll('.skill-svg');

    var defaultSkillDiv = document.getElementById('default-skill-div');
    var skillDiv = document.getElementById('skill-div');

    function loadSkill(title) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                skillDiv.innerHTML = this.responseText;
                defaultSkillDiv.style = "display: none";
            }
        };

        xhttp.open('GET', "html/skill/" + title + '.html');
        xhttp.send();
    }

    for (let i = 0; i < skillSvgs.length; i++) {
        skillSvgs[i].onmouseover = function (evt) {
            let id = this.id.split('-');
            loadSkill(id[id.length - 1]);
        }
    }

}
