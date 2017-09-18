window.onload = function () {
    var objSvg = document.getElementById('object-skill');

    var displaySkill = function (id) {
        let ids = id.split('-');
        let title = ids[ids.length - 1];

        if (listSkill[title]) {
            skillDiv.innerHTML = listSkill[title];
        } else {
            loadSkill(title);
        }
    }
    

    if (objSvg.contentDocument !== null) {
        var skillSvg = objSvg.contentDocument.getElementById('skill-svg');
        var skillSvgs = skillSvg.querySelectorAll('.skill-svg');

        for (let i = 0; i < skillSvgs.length; i++) {
            skillSvgs[i].onmouseover = function () {
                displaySkill(this.id);
            };
        }

    } else {
        var skillList = document.querySelector('#object-skill > .list-group');

        skillList.onclick = function (evt) {
            var elements = document.querySelectorAll('#object-skill .list-group-item');

            displaySkill(evt.target.id);

            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove('active');
            }

            evt.target.classList.add('active');
        };
    }

    var defaultSkillDiv = document.getElementById('default-skill-div');
    var skillDiv = document.getElementById('skill-div');
    var listSkill = {};

    function loadSkill(title) {

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                skillDiv.innerHTML = this.responseText;
                defaultSkillDiv.style = "display: none";
                listSkill[title] = this.responseText;
            }
        };

        xhttp.open('GET', "html/skill/" + title + '.html');
        xhttp.send();
    }

}
