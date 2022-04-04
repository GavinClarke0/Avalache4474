import {faker} from '@faker-js/faker'


function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

let dangerRatingDescriptions = {
    1: "Generally safe avalanche conditions. Watch for unstable snow on isolated terrain features.\n" +
        "\n" +
        "Natural and human-triggered avalanches unlikely.\n" +
        "\n" +
        "Small avalanches in isolated areas or extreme terrain.",
    2: "Heightened avalanche conditions on specific terrain features. Evaluate snow and terrain carefully; identify features of concern.\n" +
        "\n" +
        "Natural avalanches unlikely; human-triggered avalanches possible.\n" +
        "\n" +
        "Small avalanches in specific areas; or large avalanches in isolated areas.",
    3: "Dangerous avalanche conditions. Careful snowpack evaluation, cautious route-finding and conservative decision-making essential.\n" +
        "\n" +
        "Natural avalanches possible; human-triggered avalanches likely.\n" +
        "\n" +
        "Small avalanches in many areas; or large avalanches in specific areas; or very large avalanches in isolated areas.",
    4: "Very dangerous avalanche conditions. Travel in avalanche terrain not recommended.\n" +
        "\n" +
        "Natural avalanches likely; human-triggered avalanches very likely.\n" +
        "\n" +
        "Large avalanches in many areas; or very large avalanches in specific areas.",
    5: "Avoid all avalanche terrain.\n" +
        "\n" +
        "Natural and human-triggered avalanches certain.\n" +
        "\n" +
        "Large to very large avalanches in many areas."
}

export default function GenerateAvalanche() {

    // avalanche canada danger rankings as ints
    let ratings = [1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,5]

    // array of possible risks
    let risks = [
        {title:"Storm Slab", area: "N", description: "New storm slabs will likely form throughout the day. " +
                "These slabs will be largest and most reactive near ridge crests where wind loading " +
                "is a factor.", image: ""},
        {title:"Wet Loose", area: "S", description: "Use extra caution on steep slopes below treeline. Forecasted precipitation " +
                "could fall as rain at lower elevations causing the snowpack to loose strength", image: ""},
        {title:"Wind Slab", area: "N", description: "Wind slab could be found in exposed treeline and alpine terrain. Strong winds " +
                "mean that wind slab could be found further down slope than expected.", image: ""},
        {title:"Cornice", area: "N", description: "Ongoing winds have formed overhanging cornices. The likelihood of natural " +
                "cornice falls can increase with warming.", image: ""},
        {title:"Persistent Slab", area: "N", description: "A buried crust on south facing slopes continues to be sensitive to " +
                "human triggering. Short periods of sunshine may increase likelihood of triggering on south facing features.", image: ""},
    ]



    let risksFound = Math.random()*risks.length

    let chosenRating = ratings[Math.floor(Math.random()*ratings.length)];
    let chosenRating2 = ratings[Math.floor(Math.random()*ratings.length)];
    let chosenRating3 = ratings[Math.floor(Math.random()*ratings.length)];


    let chosenRisks = getRandomSubarray(risks, risksFound);

    return {
        danger_rating: [chosenRating2, chosenRating, chosenRating, chosenRating2, chosenRating3],
        dangerRatingDescriptions: dangerRatingDescriptions,
        risks: chosenRisks,
        area: faker.address.cityName()
    }

}

