var table = document.getElementById("content");

$.get('https://api.guildwars2.com/v2/guild/9C3C069A-DC75-E511-925A-AC162DAE5AD5/log' +
    '?access_token=10A44CA0-9E89-4E4B-9B25-9E0B04AA651ACE67B3A2-D5FF-4A43-BF27-3E3AD75B27AA', function (data) {
    var rows = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].operation == 'deposit') {
            (function () {
                rows++;
                var row = table.insertRow(rows);

                var time = row.insertCell(0);
                var white = row.insertCell(1);
                var name = row.insertCell(2);
                var item = row.insertCell(3);
                var amount = row.insertCell(4);
                var space = row.insertCell(5);
                var money = row.insertCell(6);

                var dateTime = data[i].time;
                var user = data[i].user;
                var count = data[i].count;
                var coins = data[i].coins;
                var whitespace = '&nbsp;&nbsp;&nbsp;&nbsp;';

                if (data[i].item_id != 0) {
                    $.get('https://api.guildwars2.com/v2/items/' + data[i].item_id, function (itemStuff) {
                        item.innerHTML = itemStuff.name;
                        amount.innerHTML = count;
                    });
                } else {
                    money.innerHTML = coins;
                }

                time.innerHTML = dateTime;
                name.innerHTML = user;
                white.innerHTML = whitespace;
                space.innerHTML = whitespace;
            })();
        }
    }
}, "json");
