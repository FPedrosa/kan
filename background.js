function getMBdisponiveis(){
				try {
					var req = new XMLHttpRequest(); 
					var url = "http://redirect.kanguru.pt/kanguru/RedirectAlertaConsumo.aspx?final_url=aHR0cDovL3JlZGlyZWN0Lmthbmd1cnUucHQvS2FuZ3VydS9SZWRpcmVjdENDU2VtU2FsZG8uYXNweA%3d%3d&msisdn=0BdTiF50t7hnu8l4Mlg9gr2OKGdwNBDq%2bO5y76ssepk%3d";
					req.open("GET", url, true); // false means do it synchronously
					req.onreadystatechange=function(){
						if (req.readyState==4){
							if (req.status==200){
								var eventBox = req.responseText;
								var time = 0;
								
								var MB = eventBox.slice(eventBox.lastIndexOf(" ", eventBox.indexOf("MB")), eventBox.indexOf("MB"));
								if (MB.indexOf(",") != -1) MB = MB.slice(0, MB.indexOf(","));
								
								console.log("req: ", MB);
								notif("", "Kanguru consumo", MB);

								if (MB > 60) {
									time = MB/4;
									
								} else {
									console.log("menor");
									setMBdesponiveis();
									time = 1;
								}
								console.log("TIME: ",time);
								var t = setTimeout(function() { getMBdisponiveis() }, time*60*1000)
							}
						}
					}
					
					req.send();
				}
				catch(e)
				{
					console.log("ERROR: ", e);
				}
			}
			
			function setMBdesponiveis(){
				var req = new XMLHttpRequest();
				var url = "http://redirect.kanguru.pt/kanguru/KanguruCriaSessao.aspx?pacote=31&ecode=COM-000&enative=0&operacao=compraPacote&roaming=false";
				req.open("GET", url, true); // false means do it synchronously
				req.onreadystatechange = function(){
					if (req.readyState == 4) {
						if (req.status == 200) {
							var eventBox = req.responseText;
							console.log("req: ", eventBox);
						}
					}
				}
				console.log("SET OK");
				req.send();
			}
			
			function notif(img, title, body){
				var a = webkitNotifications.createNotification(img, title, body);
				a.show();
				setTimeout(function(){a.cancel();}, 10000);
			}

getMBdisponiveis();
