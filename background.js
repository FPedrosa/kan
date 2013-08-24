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
                var mb = eventBox.slice(eventBox.lastIndexOf(" ", eventBox.indexOf("MB")), eventBox.indexOf("MB"));

                if (mb.indexOf(",") != -1)
                    mb = mb.slice(0, mb.indexOf(","));

                if (mb > 60)
                    time = mb/4;
                else {
                    setMBdesponiveis();
                    time = 1;
                }
                time *= 60;

                notif("", "Kanguru consumo", hhmmss(time));

                console.log("MB: ", mb);
                console.log("TIME: ",hhmmss(time));
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
    var a = webkitNotifications.createNotification(img, title, body);
    a.show();
    setTimeout(function(){a.cancel();}, 10000);
}

getMBdisponiveis();
