// For todays date;
Date.prototype.today = function () {
    return ((this.getDate() < 10)?"0":"") + this.getDate() + "/"
    + (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) + "/"
    + this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"
    + ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"
    + ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

function hhmmss(sec) {
    var h = Math.floor(sec / 60 / 60);
    sec = sec - h * 60 * 60;
    var m = Math.floor(sec / 60);
    sec = sec - m * 60;
    var s = Math.floor(sec);

    return h + ":" + m + ":" + s;
}

function getMBdisponiveis() {
    try {
        var req = new XMLHttpRequest();
        var url = "http://redirect.kanguru.pt/kanguru/RedirectAlertaConsumo.aspx?final_url=aHR0cDovL3JlZGlyZWN0Lmthbmd1cnUucHQvS2FuZ3VydS9SZWRpcmVjdENDU2VtU2FsZG8uYXNweA%3d%3d&msisdn=0BdTiF50t7hnu8l4Mlg9gr2OKGdwNBDq%2bO5y76ssepk%3d";
        req.open("GET", url, true);
        req.onreadystatechange = function() {
            if (req.readyState == 4 &&
                req.status == 200) {
                var eventBox = req.responseText;
                var time = 0;
                var tmp = "";
                var mb = "";

                //console.log("CONTENT", eventBox);
                mb = eventBox.slice(eventBox.indexOf("class=\"conteudo\""));
                mb = mb.slice(mb.lastIndexOf(" ", mb.indexOf("MB")), mb.indexOf("MB"));
                if (mb.indexOf(",") != -1)
                    mb = mb.slice(0, mb.indexOf(","));

                if (mb > 70) {
                    time = 1;
                    tmp = "get";
                } else {
                    setMBdesponiveis();
                    time = 0;
                    tmp="set";
                }
                time *= 60 * (60 / 2); // half an hour

                var newDate = new Date();
                var datetime = "Last Update: " + newDate.today() + " @ " + newDate.timeNow();

                console.log(tmp, mb, datetime);
                notif("" ,tmp + mb, datetime);

                var t = setTimeout(function() { getMBdisponiveis() }, time*1000)
            }
        }

        req.send();
    } catch(e) {
        console.log("ERROR: ", e);
    }
}

function setMBdesponiveis(){
    var req = new XMLHttpRequest();
    var url = "http://redirect.kanguru.pt/kanguru/KanguruCriaSessao.aspx?pacote=31&ecode=COM-000&enative=0&operacao=compraPacote&roaming=false";
    req.open("GET", url, true);
    req.onreadystatechange = function() {
        if (req.readyState == 4 &&
            req.status == 200) {
            var eventBox = req.responseText;
            console.log("req: ", eventBox);
        }
    }

    req.send();
}

function notif(img, title, body){
    var a = new Notification(title, {body: body});
    setTimeout(function(){a.close();}, 10000);
}

getMBdisponiveis();
