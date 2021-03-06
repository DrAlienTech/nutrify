setTimeout(function () {
    graph('overviewChart0', 'Meals');
    graph('overviewChart1', 'Nutrition');
    graph('overviewChart2', 'Fitness');
    graph('overviewChart3', 'Goals');

    var urlParams = new URLSearchParams(window.location.search);
    var largeChart0Graph = urlParams.get('largeChart0');

    if (largeChart0Graph) {
        graph('largeChart0', largeChart0Graph);
    } else {
        graph('largeChart0', 'Meals');
    }
}, 800);

function graph(elementID, dataID) {
    var context = document.getElementById(elementID).getContext('2d');
    
    switch (dataID) {
        case "Meals":
            var chart = new Chart(context, {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: 'Meals',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

            if (elementID.includes("largeChart")) {
                xhttp('meal-form', elementID.substr(0, elementID.length - 1) + 'Input' + elementID[elementID.length - 1]);
            }
            break;
        case "Nutrition":
            var nutritionDataLabels = [];
            var nutritionData = [];

            var getNutritionRating = new nutritionRating();

            setTimeout(function () {
                var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                for (var c = 0; c < 7; c++) {
                    var d = new Date(new Date() - 86400000 * (6-c));
                    var date = d.getDate() + months[d.getMonth()] + d.getFullYear();
                    nutritionData.push(Math.floor(nutritionRatingMap.get(date)));

                    var dateLabel = d.getMonth() + "/" + d.getDate();
                    nutritionDataLabels.push(dateLabel);
                }

                var chart = new Chart(context, {
                    type: 'line',
                    data: {
                        labels: nutritionDataLabels,
                        datasets: [{
                            label: 'Daily Nutrition Rating',
                            backgroundColor: "#009c68",
                            borderColor: "#009c68",
                            data: nutritionData,
                            fill: false,
                        }]
                    },
                    options: {
                        responsive: true,
                        tooltips: {
                            mode: 'index',
                            intersect: false,
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Date'
                                }
                            }],
                            yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Rating (Percentage)',
                                },
                                ticks: {
                                    min: 0,
                                    max: 100
                                }
                            }]
                        }
                    }
                });
            }, 500);
            break;
        case "Fitness":
            var chart = new Chart(context, {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: 'Fitness',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

            if (elementID.includes("largeChart")) {
                xhttp('fitness-form', elementID.substr(0, elementID.length - 1) + 'Input' + elementID[elementID.length - 1]);
            }
            break;
        case "Goals":
            usersUser.get().then(function (doc) {
                var goals = doc.data().goals;
                if (goals && goals.length > 0) {
                    goalRating(doc);
                } else {
                    return console.log("User does not have any goals.");
                }
            });
            
            var chart = new Chart(context, {
                type: 'horizontalBar',
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [{
                        label: 'Goal Progress',
                        backgroundColor: "#009c68",
                        borderColor: "#009c68",
                        borderWidth: 1,
                        data: [24,75,26,57,93,84,63]
                    }]
                },
                options: {
                    elements: {
                        rectangle: {
                            borderWidth: 2,
                        }
                    },
                    responsive: true,
                    legend: {
                        position: 'top',
                    }
                }
            });
            
            if (elementID.includes("largeChart")) {
                xhttp('goal-form', elementID.substr(0, elementID.length - 1) + 'Input' + elementID[elementID.length - 1]);
                xhttp('goal-tracker', elementID.substr(0, elementID.length - 1) + 'Content' + elementID[elementID.length - 1]);
            }
            break;
    }

    document.getElementById(elementID.substr(0, elementID.length-1) + 'Title' + elementID[elementID.length-1]).innerHTML = dataID;
};

function addMeal() {
    var meal = inputText('meal');
    var foods = inputText('food').replace(/, /g, ",").replace(/ ,/g, ",").split(",");
    foods = foods.filter(a => a !== "");

    var mop = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let today = mop.getDate() + months[mop.getMonth()] + mop.getFullYear();

    eval("usersUser.update({'dailyData." + today + ".meals." + meal + "': foods });");
};

var goalTemplates = new Map([
    ["Eat", [
        "meals per day" // 5
    ]],
    ["(Nutrients) Consume", [
        "calories per meal", // 6
        "calories per day"
    ]],
    ["Drink", [
        "cups of water per day", // 7
        "cups of juice per day"
    ]],
    ["(Exercise) Do", [ // Miscellaneous Activities (without a standard verb like Run or Jog)
        "pushups per day",// 6
        "situps per day",
    ]],
    ["Run", [
        "miles per hour", // 5
        "miles per day",
        "hours per day"
    ]],
    ["Walk", [
        "miles per hour", // 5
        "miles per day",
        "hours per day"
    ]],
    ["Jog", [
        "miles per hour", // 5
        "miles per day",
        "hours per day"
    ]],
    ["Weightlift", [
        "pounds per day",
        "hours per day"
    ]]
]);

function goalActionChange() {
    var action = inputText("goalAction");

    var units = document.getElementById("goalUnits");
    var options = goalTemplates.get(action);

    units.innerHTML = "<option selected>Choose...</option>";
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        var elem = document.createElement("option");
        elem.textContent = option;
        elem.value = option;
        units.appendChild(elem);
    }
}

function addGoal() {
    var action = inputText('goalAction');
    var amount = inputText('goalAmount');
    var units = inputText('goalUnits');

    if (action == "Choose...") {
        alert("Please select an action!");
        return console.error("Error: Goal form was submitted without an action; rejected submit.");
    } else if (units == "Choose...") {
        alert("Please select units!");
        return console.error("Error: Goal form was submitted without units; rejected submit.");
    } else {
        var validationResult = validate(action, amount, units);
        if (validationResult[0] != true) {
            alert(validationResult[1]);
            return console.error("Goal form was submitted without a valid amount; rejected submit.\n" + validationResult[1]);
        }
    }

    var mop = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var today = mop.getDate() + months[mop.getMonth()] + mop.getFullYear();

    var goal = action + " " + amount + " " + units;
    eval(`usersUser.update({
        goals: firebase.firestore.FieldValue.arrayUnion({"` + goal + `": "` + today + `"})
    })`);
};

var fitnessTemplates = new Map([
    ["Do", [ // Miscellaneous Activities (without a standard verb like Run or Jog)
        "pushups",
        "situps",
    ]],
    ["Run", [
        "miles",
        "hours"
    ]],
    ["Walk", [
        "miles",
        "hours"
    ]],
    ["Jog", [
        "miles",
        "hours"
    ]],
    ["Weightlift", [
        "pounds",
        "hours"
    ]]
]);

function fitnessTimeFormatChange() {
    var selection = document.getElementById("fitnessTimeFormat").checked;

    if (selection) {
        display('fitnessTimeDuration');
        display('fitnessTimeRange');
    } else {
        display('fitnessTimeRange');
        display('fitnessTimeDuration');
    }
};

function fitnessActionChange() {
    var action = inputText("fitnessAction");

    var units = document.getElementById("fitnessUnits");
    units.innerHTML = "<option selected>Choose...</option>";

    if (action != "Choose...") {
        units.disabled = false;
        var options = fitnessTemplates.get(action);

        units.innerHTML = "<option selected>Choose...</option>";
        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            var elem = document.createElement("option");
            elem.textContent = option;
            elem.value = option;
            units.appendChild(elem);
        }
    } else {
        units.disabled = true;
    }
};

function logFitnessActivity() {
    var action = inputText('fitnessAction');
    var amount = inputText('fitnessAmount');
    var units = inputText('fitnessUnits');

    if (action == "Choose...") {
        alert("Please select an action!");
        return console.error("Error: Fitness form was submitted without an action; rejected submit.");
    } else if (units == "Choose...") {
        alert("Please select units!");
        return console.error("Error: Fitness form was submitted without units; rejected submit.");
    } else {
        var validationResult = validate(action, amount, units);
        if (validationResult[0] != true) {
            alert(validationResult[1]);
            return console.error("Fitness form was submitted without a valid amount; rejected submit.\n" + validationResult[1]);
        }
    }

    var selection = document.getElementById("fitnessTimeFormat").checked;
    if (selection) {
        var startTime = inputText('startTimeInput');
        var endTime = inputText('endTimeInput');

        var startDate = new Date();
        startDate.setHours(startTime.substr(0, 2));
        startDate.setMinutes(startTime.substr(3, 5));
        startDate.setSeconds(0);

        var endDate = new Date();
        endDate.setHours(endTime.substr(0, 2));
        endDate.setMinutes(endTime.substr(3, 5));
        endDate.setSeconds(0);

        var time = (endDate - startDate) / 60000;

        if (time < 1) {
            alert("Time duration can not be negative or equal to 0! Please try again!");
            return console.error("Error: Fitness time was submitted without a valid amount; rejected submit.");
        } else {
            var log = {
                timeFormat: "range",
                startTime: startTime,
                endTime: endTime,
                action: action,
                amount: amount,
                units: units
            }
        }
    } else {
        var time = inputText('fitnessRecordTime');

        if (!time) {
            alert("Please enter a time! Please try again!");
            return console.error("Error: Fitness time was submitted without a valid amount; rejected submit.");
        } else {
            var log = {
                timeFormat: "specific",
                recordTime: time,
                action: action,
                amount: amount,
                units: units
            }
        }
    }

    var mop = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var today = mop.getDate() + months[mop.getMonth()] + mop.getFullYear();

    eval("usersUser.update({'dailyData." + today + ".fitness': firebase.firestore.FieldValue.arrayUnion(log)});");
};

function validate(action, amount, units) {
    if (amount < 0 || amount.includes("-")) {
        return [false, "Error: amount cannot be a negative number."];
    } else if (!action) {
        
    } else {
        return [true];
    }
};

function xhttp(source, tag) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(tag).innerHTML = this.responseText;
        }
    };

    xhttp.open("GET", `${source}.html`, true);
    xhttp.send();
};

class nutritionRating {
    constructor() {
        var calc = 0;
        var nutrientTotal = [];
        var catastrophe = "";
        var RegularDiet = ["150=350", "2.2=7.7", "0~30;0=10.8|31~60;11.16=21.6|61~100;21.96=36|101~150;21=54|150~200;21=72|201~275;21=80|255~500;30=120", "16=22", "25=30", "M;0=36|F;0=25", "M;2400=2900|F;1800=2300", "M;19-50;1=2.5|M;51-70;1=2|M;71-150;1.2=2|W;0-50;1=2.5|W;51-1501.2=2", "0.0018=0.010", "2-11;0.0115=0.0137|12-19;0.014=0.016|M;20-150;0.0163=0.0182|W;20-150;0.0126=0.0135", "1-3;0.07=0.09|4-8;0.11=0.13|9-13;0.24|F;14-18;0.34=0.38|F;19-30;0.29=0.33|F;31-150;0.3=0.34|M;14-150;0.39=0.43", "1-8;0.0010=0.002|M;9-150;0.0019=0.0023|F;9-150;0.0016=0.0018", "0.8=1.2", "3.5=5", "0.000050=0.00007", "1.5=2.3", "F;0.0007=9|M;0.0010=0.0012", "0.003=0.01", "0.008=0.012", "0.008=0.021", "M;.5=.6|F;.375=0.475", "0.0004=0.0008", "0.013=0.02", "0.005=1", "M;0.0010=0.0015|F;0.0009=0.0013", "700=10000", "0.0013=0.0017", "0.0000020=0.0000028", "0.065=2", "600=2000", "0.006=0.014", "0.00007=0.00013", "0=0.04", "0.2=0.4", "0.5=1", "0.1=0.4"];

        var age = "13";
        var weight = "100";
        var gender = "M";

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        window.nutritionRatingMap = new Map();

        var test = db.collection('temporaryCollection').doc('temporaryDocument');
        test.get().then(function (doc) {
            for (var c = 0; c < 7; c++) {
                var d = new Date(new Date() - 86400000 * c);
                var date = d.getDate() + months[d.getMonth()] + d.getFullYear();

                var dailyData = doc.data().dailyData;
                var data = (dailyData) ? dailyData[date] : null;
                var nutrients = (data) ? data.nutrients : null;

                if (!data || !nutrients) {
                    console.log("User does not have nutrition data for the date " + date);
                    window.nutritionRatingMap.set(date, 0);
                    continue;
                }

                for (var i = 0; i < 36; i++) {
                    catastrophe = "";
                    var force = RegularDiet[i];
                    var classArray = [];
                    var comp = "";

                    for (var l = 0; l < force.length; l++) {
                        if (force[l] == "|" || l + 1 == force.length) {
                            if (l + 1 == force.length) {
                                comp += force[l];
                            }
                            classArray.push(comp);
                            comp = "";
                        }
                        else {
                            comp += force[l];
                        }
                    }

                    var finalAge = "", finalWeight = "", finalGender = "", finalValue = "", prop = "", countUp = 0;
                    var bunny = true;

                    for (var z = 0; z < classArray.length; z++) {
                        var chaste = classArray[z];

                        for (var m = 0; m < chaste.length; m++) {
                            if (chaste[m] == ";" || m + 1 == chaste.length) {
                                if (m + 1 == chaste.length) {
                                    prop += chaste[m];
                                }
                                if (prop == "M" || prop == "F") {
                                    finalGender = prop;
                                }
                                else if (prop.includes("-") == true) {
                                    finalAge = prop;
                                }
                                else if (prop.includes("~") == true) {
                                    finalWeight = prop;
                                }
                                else if (prop.includes("=") == true) {
                                    finalValue = prop;
                                }
                                prop = "";
                            }
                            else {
                                prop += chaste[m];
                            }
                        }

                        if (finalAge != "") {
                            countUp++;
                        }

                        if (finalGender != "") {
                            countUp++;
                        }

                        if (finalWeight != "") {
                            countUp++;
                        }

                        if ([0, 1, 2, 3].includes(countUp)) {
                            function system(compute, initital, boy) {
                                var startVal = "", endVal = "", cat = "";

                                for (var k = 0; k < compute.length; k++) {
                                    if (compute[k] == boy || k + 1 == compute.length) {
                                        if (k + 1 == compute.length) {
                                            cat += compute[k];
                                            endVal = parseFloat(cat, 10);
                                        } else {
                                            startVal = parseFloat(cat, 10);
                                        }
                                        cat = "";
                                    } else {
                                        cat += compute[k];
                                    }
                                }

                                if (initital <= endVal && initital >= startVal) {
                                    calc++;
                                }

                                if (boy == "=") {
                                    catastrophe = startVal;
                                }
                            }

                            if (finalAge != "") {
                                system(finalAge, age, "-");
                            }

                            if (finalWeight != "") {
                                system(finalWeight, weight, "~");
                            }

                            if (finalGender != "" && finalGender == gender) {
                                calc++;
                            }

                            if (finalValue != "") {
                                system(finalValue, nutrients[i], "=");
                            }

                            if (calc == (countUp + 1)) {
                                bunny = false;
                            }
                        }

                        calc = 0; //reinitialize variable for the next loop
                        countUp = 0;
                    }

                    if (bunny == true && catastrophe != "") {
                        //Client doing bad on these nutrients
                        var criss = (nutrients[i] / catastrophe) * 100;
                        if (isNaN(criss) == true) {
                            criss = 0;
                        }
                        nutrientTotal.push(criss);
                    }
                    else if (bunny = false) {
                        nutrientTotal.push(100);
                    }

                    bunny = true;

                    if (i == 35) {
                        var sum = 0;

                        for (var o = 0; o < nutrientTotal.length; o++) {
                            sum += nutrientTotal[o];
                        }

                        var average = sum / 36;
                        window.nutritionRatingMap.set(date, average);
                        continue;
                    }
                }
            }
        }).catch(function (e) {
            console.error(e);
        });
    }
}

function goalRating(doc) {
    var url = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=3gxUJxixMLQ0VcnleWLIzaXbkjU3a7CgwbU34cvM&query=';

    var goals = doc.data().goals;
    var dailyData = doc.data().dailyData;
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var scores = new Map(); // Map<Goal,ScoreArray>
    for (var i = 0; i < goals.length; i++) {
        var goalString = Object.keys(goals[i])[0];
        var date = Object.values(goals[i])[0];

        var goal = goalString.split(" ");

        if (goal.length == 7) {
            // Goal is "Drink X cups of Y per day"
            var parsedGoal = [goal[0], goal[1], goal[2] + " " + goal[3] + " " + goal[4] + " " + goal[5] + " " + goal[6]];
        } else if (goal.length == 5) {
            // Goal is "Eat...", "Run...", "Walk...", "Jog...", or "Weightlift X Y per Z"
            var parsedGoal = [goal[0], goal[1], goal[2] + " " + goal[3] + " " + goal[4]];
        } else {
            // Goal is "(Nutrients) Consume" or "(Exercise) Do"
            var parsedGoal = [goal[0] + " " + goal[1], goal[2], goal[3] + " " + goal[4] + " " + goal[5]];
        }

        var action = parsedGoal[0];
        var amount = parsedGoal[1];
        var units = parsedGoal[2];

        switch (action) {
            case "Eat":
                var month = date.slice(2, -4);

                if (!months.includes(month)) {
                    month = date.slice(1, -4);
                    var day = date.slice(0, 1);
                } else {
                    var day = date.slice(0, 2);
                }

                var originalDate = new Date()
                originalDate.setFullYear(date.slice(-4, date.length));
                originalDate.setMonth(months.indexOf(month));
                originalDate.setDate(day);

                var dateRange = (new Date() - originalDate) / 86400000;

                // From past to present
                var scoresArray = [];
                for (var j = dateRange; j >= 0; j--) {
                    // Calculate date by subtracting dimensional analysis of j (number of days) in milliseconds
                    var currentDateObj = new Date(new Date() - j * 86400000);
                    var currentDate = currentDateObj.getDate() + months[currentDateObj.getMonth()] + currentDateObj.getFullYear();

                    // If data exists for the day, calculate the raw score
                    // Else, count as 0
                    if (dailyData[currentDate].food) {
                        // Calculate raw score
                        var foodMap = dailyData[currentDate].food;

                        var mealCount = 0;
                        foodMap.forEach(function (value, key) {
                            if (key != "DN") {
                                mealCount++;
                            }
                        });

                        var difference = Math.abs(amount - mealCount);

                        switch (difference) {
                            case 1:
                                var rawScore = 90;
                                break;
                            case 2:
                                var rawScore = 70;
                                break;
                            case 3:
                                var rawScore = 60;
                                break;
                            default:
                                if (mealCount == 0) { // Shouldn't be possible, just here for safety
                                    var rawScore = 10;
                                } else { // Eating 4+ meals more or less than the goal, exponentially decay score
                                    var rawScore = Math.floor(60 - 1.4 ** difference);
                                }
                        }

                        // Take the average score for j between [dateRange, j]
                        var sum = scoresArray.reduce(function (a, b) {
                            return (a + b);
                        }, 0);
                        var averageScore = sum / scoresArray.length;

                        // If j >= D-7, then take the difference between score for j and average score for j between [dateRange, j],
                        // aka growth of score and add (weighted) to the raw score of that day
                        if (j > 7) {
                            var growth = currentScore - averageScore;
                            var growthAdjustedScore = rawScore + growth / 10;
                        }

                        // Make sure max score is 100 and min score is 0
                        if (growthAdjustedScore > 100) {
                            growthAdjustedScore = 100;
                        } else if (growthAdjustedScore < 0) {
                            growthAdjustedScore = 0;
                        }

                        // Add Growth Adjusted Score to array of scores
                        scoresArray.push(growthAdjustedScore);
                    } else {
                        scoresArray.push(0);
                        continue;
                    }
                }
                scores.set(goalString, scoresArray);
                break;
            case "Drink":
                var month = date.slice(2, -4);

                if (!months.includes(month)) {
                    month = date.slice(1, -4);
                    var day = date.slice(0, 1);
                } else {
                    var day = date.slice(0, 2);
                }

                var originalDate = new Date()
                originalDate.setFullYear(date.slice(-4, date.length));
                originalDate.setMonth(months.indexOf(month));
                originalDate.setDate(day);

                var dateRange = (new Date() - originalDate) / 86400000;

                // From past to present
                var scoresArray = [];
                for (var j = dateRange; j >= 0; j--) {
                    // Calculate date by subtracting dimensional analysis of j (number of days) in milliseconds
                    var currentDateObj = new Date(new Date() - j * 86400000);
                    var currentDate = currentDateObj.getDate() + months[currentDateObj.getMonth()] + currentDateObj.getFullYear();

                    // If data exists for the day, calculate the raw score
                    // Else, count as 0
                    if (dailyData[currentDate].food) {
                        // Calculate raw score
                        var foodMap = dailyData[currentDate].food;

                        var drinkCount = 0;

                        foodMap.forEach(function (value, key) {
                            if (value.includes(goal[4])) {
                                drinkCount++;
                            }
                        });

                        var difference = Math.abs(amount - drinkCount);

                        switch (difference) {
                            case 1:
                                var rawScore = 90;
                                break;
                            case 2:
                                var rawScore = 70;
                                break;
                            case 3:
                                var rawScore = 60;
                                break;
                            default:
                                if (drinkCount == 0) { // Shouldn't be possible, just here for safety
                                    var rawScore = 10;
                                } else { // Drinking 4+ cups more or less than the goal, exponentially decay score
                                    var rawScore = Math.floor(60 - 1.4 ** difference);
                                }
                        }

                        // Take the average score for j between [dateRange, j]
                        var sum = scoresArray.reduce(function (a, b) {
                            return (a + b);
                        }, 0);
                        var averageScore = sum / scoresArray.length;

                        // If j >= D-7, then take the difference between score for j and average score for j between [dateRange, j],
                        // aka growth of score and add (weighted) to the raw score of that day
                        if (j > 7) {
                            var growth = currentScore - averageScore;
                            var growthAdjustedScore = rawScore + growth / 10;
                        }

                        // Make sure max score is 100 and min score is 0
                        if (growthAdjustedScore > 100) {
                            growthAdjustedScore = 100;
                        } else if (growthAdjustedScore < 0) {
                            growthAdjustedScore = 0;
                        }

                        // Add Growth Adjusted Score to array of scores
                        scoresArray.push(growthAdjustedScore);
                    } else {
                        scoresArray.push(0);
                        continue;
                    }
                }
                scores.set(goalString, scoresArray);
                break;
            case "(Nutrients) Consume":
                var month = date.slice(2, -4);

                if (!months.includes(month)) {
                    month = date.slice(1, -4);
                    var day = date.slice(0, 1);
                } else {
                    var day = date.slice(0, 2);
                }

                var originalDate = new Date()
                originalDate.setFullYear(date.slice(-4, date.length));
                originalDate.setMonth(months.indexOf(month));
                originalDate.setDate(day);

                var dateRange = (new Date() - originalDate) / 86400000;

                // From past to present
                var scoresArray = [];
                for (var j = dateRange; j >= 0; j--) {
                    // Calculate date by subtracting dimensional analysis of j (number of days) in milliseconds
                    var currentDateObj = new Date(new Date() - j * 86400000);
                    var currentDate = currentDateObj.getDate() + months[currentDateObj.getMonth()] + currentDateObj.getFullYear();

                    // If data exists for the day, calculate the raw score
                    // Else, count as 0
                    if (dailyData[currentDate].food) {
                        // Calculate raw score
                        var foodMap = dailyData[currentDate].food;

                        let dailyScores = [];

                        switch (units) {
                            case "calories per meal":
                                foodMap.forEach(async function (value, key) {
                                    for (var k in value) {
                                        let mealTotal = 0;
                                        let rawScore = 0;

                                        let foodList = new Map();

                                        for (var l in value[k]) {
                                            const item = value[k][l];

                                            if (foodList.has(item)) {
                                                mealTotal += foodList.get(item);
                                            } else if (item != "water") {
                                                await fetch(url + item).then(res => res.json()).then(function (data) {
                                                    var nutrientData = data.foods[0].foodNutrients;

                                                    for (var t = 0; t < nutrientData.length; t++) {
                                                        if (nutrientData[t].nutrientId == "1005" || nutrientData[t].nutrientId == "1003" || nutrientData[t].nutrientId == "1258") {
                                                            if (nutrientData[t].unitName == "G") {
                                                                nutrientVa = nutrientData[t].value;
                                                            } else if (nutrientData[t].unitName == "MG") {
                                                                nutrientVa = nutrientData[t].value / 1000;
                                                            } else if (nutrientData[t].unitName == "UG") {
                                                                nutrientVa = nutrientData[t].value / 1000000;
                                                            }
                                                            if (nutrientData[t].nutrientId == "1005" || nutrientData[t].nutrientId == "1003") {
                                                                calories = 4 * nutrientVa;
                                                            } else {
                                                                calories = 9 * nutrientVa;
                                                            }
                                                        }
                                                    }

                                                    mealTotal += calories;
                                                    foodList.set(item, calories, item);
                                                }).catch(function (err) {
                                                    console.error(err);
                                                });
                                            }
                                        }

                                        if (amount == 0 && mealTotal != 0) {
                                            rawScore = 0;
                                        } else {
                                            rawScore += Math.floor((mealTotal/amount) * 100);
                                        }

                                        // if (k == value.length) { // k DOESN"T WORK HERE
                                        //     dailyScores.push(rawScore);
                                        // }
                                    }
                                });
                                break;
                            case "calories per day":
                                break;
                            default:
                                return console.error("Error occurred: (Nutrients) Consume goal contains invalid units.");
                        }

                        switch (difference) {
                            case 1:
                                var rawScore = 90;
                                break;
                            case 2:
                                var rawScore = 70;
                                break;
                            case 3:
                                var rawScore = 60;
                                break;
                            default:
                                if (mealCount == 0) { // Shouldn't be possible, just here for safety
                                    var rawScore = 10;
                                } else { // Drinking 4+ cups more or less than the goal, exponentially decay score
                                    var rawScore = Math.floor(60 - 1.4 ** difference);
                                }
                        }

                        // Take the average score for j between [dateRange, j]
                        var sum = scoresArray.reduce(function (a, b) {
                            return (a + b);
                        }, 0);
                        var averageScore = sum / scoresArray.length;

                        // If j >= D-7, then take the difference between score for j and average score for j between [dateRange, j],
                        // aka growth of score and add (weighted) to the raw score of that day
                        if (j > 7) {
                            var growth = currentScore - averageScore;
                            var growthAdjustedScore = rawScore + growth / 10;
                        }

                        // Make sure max score is 100 and min score is 0
                        if (growthAdjustedScore > 100) {
                            growthAdjustedScore = 100;
                        } else if (growthAdjustedScore < 0) {
                            growthAdjustedScore = 0;
                        }

                        // Add Growth Adjusted Score to array of scores
                        scoresArray.push(growthAdjustedScore);
                    } else {
                        scoresArray.push(0);
                        continue;
                    }
                }
                break;
        }
    }
};