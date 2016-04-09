function getData() {
    var itemTable = document.getElementById("items");
    var coinTable = document.getElementById("coins");
    var guildID = document.getElementById("id").value;
    var guildKey = document.getElementById("key").value;

    $.get('https://api.guildwars2.com/v2/guild/' + guildID + '/log' + '?access_token=' + guildKey, function (data) {
        var itemRows = 0;
        var coinRows = 0;

        for (var i = 0; i < data.length; i++) {
            if (data[i].operation == 'deposit') {
                if (data[i].item_id != 0) {
                    (function () {
                        itemRows++;
                        var row = itemTable.insertRow(itemRows);

                        var time = row.insertCell(0);
                        var name = row.insertCell(1);
                        var item = row.insertCell(2);
                        var amount = row.insertCell(3);

                        var dateTime = data[i].time;
                        var user = data[i].user;
                        var count = data[i].count;

                        $.get('https://api.guildwars2.com/v2/items/' + data[i].item_id, function (itemStuff) {
                            item.innerHTML = itemStuff.name;
                        });

                        time.innerHTML = dateTime;
                        name.innerHTML = user;
                        amount.innerHTML = count;
                    })();
                } else {
                    (function () {
                        coinRows++;
                        var row = coinTable.insertRow(coinRows);

                        var time = row.insertCell(0);
                        var name = row.insertCell(1);
                        var money = row.insertCell(2);

                        var dateTime = data[i].time;
                        var user = data[i].user;
                        var coins = String(data[i].coins);

                        coins =
                            (coins.slice(0, -4) ? (coins.slice(0, -4) + ' gold ') : '') +
                            (coins.slice(-4, -3) == '0' ? '' : coins.slice(-4, -3)) +
                            coins.slice(-3, -2) + ' silver ' +
                            (coins.slice(-2, -1) == '0' ? '' : coins.slice(-2, -1)) +
                            coins.slice(-1) + ' bronze';

                        time.innerHTML = dateTime;
                        name.innerHTML = user;
                        money.innerHTML = coins;
                    })();
                }
            }
        }
    }, "json");
}
